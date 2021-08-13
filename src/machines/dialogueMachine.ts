import { createMachine, assign } from 'xstate'

export type DialogueMachineContext = {
	speaker: string
	text: string[]
	face: string
	numPanels: number
	currPanel: number
}

export type DialogueEvent =
	| { type: 'DIALOGUE'; speaker: string; text: string[]; face: string }
	| { type: 'NEXT' }
	| { type: 'FINISH_DIALOGUE' }

export type DialogueTypestate =
	| {
			value: 'idle'
			context: DialogueMachineContext & {
				speaker: undefined
				text: undefined
				face: undefined
				numPanels: undefined
			}
	  }
	| {
			value: 'dialogue'
			context: DialogueMachineContext
	  }
	| {
			value: { dialogue: 'displayCurrentPanel' }
			context: DialogueMachineContext
	  }
	| {
			value: { dialogue: 'displayFinalPanel' }
			context: DialogueMachineContext
	  }

export const dialogueMachine = createMachine<
	DialogueMachineContext,
	DialogueEvent,
	DialogueTypestate
>({
	initial: 'idle',
	context: {
		speaker: '',
		text: [],
		face: '',
		numPanels: 0,
		currPanel: 0,
	},
	states: {
		idle: {
			id: 'idle',
			entry: assign({
				speaker: '',
				text: [],
				face: '',
				numPanels: 0,
				currPanel: 0,
			}),
			on: {
				DIALOGUE: {
					target: '#determinePanel',
					actions: assign((_context, event) => ({
						speaker: event.speaker,
						text: event.text,
						face: event.face,
						numPanels: event.text.length,
					})),
				},
			},
		},
		dialogue: {
			states: {
				displayCurrentPanel: {
					on: {
						NEXT: {
							target: 'determinePanel',
							actions: assign((context) => ({
								currPanel: context.currPanel + 1,
							})),
						},
					},
				},
				determinePanel: {
					id: 'determinePanel',
					always: [
						{
							target: 'displayFinalPanel',
							cond: (context) => context.currPanel === context.numPanels - 1,
						},
						{ target: 'displayCurrentPanel' },
					],
				},
				displayFinalPanel: {
					on: {
						FINISH_DIALOGUE: '#idle',
					},
				},
			},
		},
	},
})
