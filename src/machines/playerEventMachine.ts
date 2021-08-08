import { createMachine } from 'xstate'

export type PlayerEventMachineContext = {}

export type PlayerEvent = { type: 'FINISH_DIALOGUE' }

export const playerEventMachine = createMachine<
	PlayerEventMachineContext,
	PlayerEvent
>({
	id: 'playerState',
	initial: 'entering',
	states: {
		entering: {
			after: {
				500: '#shopkeeperGreeting',
			},
		},
		dialogue: {
			states: {
				shopkeeperGreeting: {
					id: 'shopkeeperGreeting',
					on: {
						FINISH_DIALOGUE: '#walkingToShopkeeper',
					},
				},
				shopkeeperDialogue: {
					id: 'shopkeeperDialogue',
				},
			},
		},
		walking: {
			states: {
				walkingToShopkeeper: {
					id: 'walkingToShopkeeper',
					initial: 'walkingRight',
					states: {
						walkingRight: {
							after: {
								3250: '#shopkeeperDialogue',
							},
						},
					},
				},
				walkingToNPC1: {
					id: 'walkingToNPC1',
					states: {},
				},
			},
		},
	},
})
