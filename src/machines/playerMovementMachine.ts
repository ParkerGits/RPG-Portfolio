import { createMachine } from 'xstate'

// controls milliseconds between each player step forward

export const playerMovementMachine = createMachine(
	{
		initial: 'idle',
		states: {
			idle: {
				on: {
					MOVE: 'moving',
				},
			},
			moving: {
				on: {
					IDLE: 'idle',
				},
				initial: 'betweenFrames',
				states: {
					betweenFrames: {
						after: {
							MS_BETWEEN_FRAMES: 'moveForward',
						},
					},
					moveForward: {
						always: 'betweenFrames',
					},
				},
			},
		},
	},
	{
		delays: {
			MS_BETWEEN_FRAMES: 10,
		},
	},
)
