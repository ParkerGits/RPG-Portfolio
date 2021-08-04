import Image from 'next/image'
import { useMachine } from '@xstate/react'
import { playerAnimationMachine } from '../machines/playerAnimationMachine'
import {
	KeyboardEvent,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

const playerAnimation = {
	idle: {
		down: '/img/player/idle/down.png',
		left: '/img/player/idle/left.png',
		right: '/img/player/idle/right.png',
		up: '/img/player/idle/up.png',
	},
	walking: {
		down: [
			'/img/player/walking/down/0.png',
			'/img/player/walking/down/1.png',
			'/img/player/walking/down/2.png',
			'/img/player/walking/down/3.png',
		],
		left: [
			'/img/player/walking/left/0.png',
			'/img/player/walking/left/1.png',
			'/img/player/walking/left/2.png',
			'/img/player/walking/left/3.png',
		],
		right: [
			'/img/player/walking/right/0.png',
			'/img/player/walking/right/1.png',
			'/img/player/walking/right/2.png',
			'/img/player/walking/right/3.png',
		],
		up: [
			'/img/player/walking/up/0.png',
			'/img/player/walking/up/1.png',
			'/img/player/walking/up/2.png',
			'/img/player/walking/up/3.png',
		],
	},
}

export default function Player() {
	const [xPos, setXPos] = useState(0)
	const [yPos, setYPos] = useState(0)
	const [current, send] = useMachine(playerAnimationMachine)
	return (
		<div
			tabIndex={0}
			style={{
				position: 'absolute',
				top: `${yPos}px`,
				left: `${xPos}px`,
				height: '47px',
			}}>
			<Image
				src={
					current.matches('idle')
						? playerAnimation.idle[current.context.facing]
						: playerAnimation.walking[current.context.facing][
								current.context.animationFrame
						  ]
				}
				width={35}
				height={47}
				alt="player"
			/>
		</div>
	)
}

/* Controllable player (buggy with useEffect)
export default function Player() {
	const [xPos, setXPos] = useState(0)
	const [yPos, setYPos] = useState(0)
	const [current, send] = useMachine(playerAnimationMachine)
	useEffect(() => {
		if (current.matches('walking')) {
			const delta = 3
			switch (current.context.facing) {
				case 'down':
					setYPos((yPos) => yPos + delta)
					break
				case 'up':
					setYPos((yPos) => yPos - delta)
					break
				case 'left':
					setXPos((xPos) => xPos - delta)
					break
				case 'right':
					setXPos((xPos) => xPos + delta)
					break
			}
		}
	}, [current])
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		let direction: string = ''
		switch (e.key) {
			default:
				return
			case 'ArrowDown':
				direction = 'down'
				break
			case 'ArrowUp':
				direction = 'up'
				break
			case 'ArrowLeft':
				direction = 'left'
				break
			case 'ArrowRight':
				direction = 'right'
				break
		}

		send('WALK', { direction })
	}
	return (
		<div
			tabIndex={0}
			onKeyDown={handleKeyDown}
			onKeyUp={() => send('IDLE')}
			style={{
				position: 'absolute',
				top: `${yPos}px`,
				left: `${xPos}px`,
				height: '47px',
			}}>
			<Image
				src={
					current.matches('idle')
						? playerAnimation.idle[current.context.facing]
						: playerAnimation.walking[current.context.facing][
								current.context.animationFrame
						  ]
				}
				width={35}
				height={47}
				alt="player"
			/>
		</div>
	)
}
 */
