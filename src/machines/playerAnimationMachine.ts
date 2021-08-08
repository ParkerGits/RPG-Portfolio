import { createMachine } from 'xstate'

export const playerAnimationMachine = createMachine({
	id: 'playerAnimationMachine',
	initial: 'idle',
	context: {
		animationFrame: 0,
		facing: 'down',
	},
	states: {
		idle: {
			entry: (context) => (context.animationFrame = 0),
			on: {
				WALK: {
					target: 'walking',
					actions: (context, event) => {
						context.facing = event.direction
					},
				},
			},
		},
		walking: {
			after: {
				125: 'frameAdvance',
			},
			on: {
				IDLE: { target: 'idle' },
				WALK: {
					actions: (context, event) => (context.facing = event.direction),
				},
			},
		},
		frameAdvance: {
			always: {
				target: 'walking',
				actions: (context) => {
					if (context.animationFrame !== 3) {
						context.animationFrame++
					} else {
						context.animationFrame = 0
					}
				},
			},
		},
	},
})
