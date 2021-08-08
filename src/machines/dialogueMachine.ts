import { createMachine, assign } from 'xstate'

export type DialogueMachineContext = {
	speaker: string
	text: string[]
	face: string
	numPanels: number
	currPanel: number
	onFinalPanel: boolean
}

export type DialogueEvent =
	| { type: 'DIALOGUE'; speaker: string; text: string[]; face: string }
	| { type: 'NEXT' }

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

export const dialogueMachine = createMachine<
	DialogueMachineContext,
	DialogueEvent,
	DialogueTypestate
>({
	id: 'dialogue',
	initial: 'idle',
	context: {
		speaker: '',
		text: [],
		face: '',
		numPanels: 0,
		currPanel: 0,
		onFinalPanel: false,
	},
	states: {
		idle: {
			entry: assign({
				speaker: undefined,
				text: undefined,
				face: undefined,
				numPanels: undefined,
				currPanel: 0,
				onFinalPanel: false,
			}),
			on: {
				DIALOGUE: {
					target: 'dialogue',
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
			entry: assign((context) => ({
				onFinalPanel: context.currPanel === context.numPanels - 1,
			})),
			on: {
				NEXT: {
					target: 'proceeding',
					actions: assign((context) => ({ currPanel: context.currPanel + 1 })),
				},
			},
		},
		proceeding: {
			always: [
				{
					target: 'idle',
					cond: (context) => context.currPanel === context.numPanels,
				},
				{ target: 'dialogue' },
			],
		},
	},
})
