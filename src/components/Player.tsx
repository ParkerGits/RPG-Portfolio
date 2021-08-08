import Image from 'next/image'
import { useActor, useMachine } from '@xstate/react'
import { playerAnimationMachine } from '../machines/playerAnimationMachine'
import { useContext, useEffect, useState } from 'react'
import { player } from '../characters'
import { playerMovementMachine } from '../machines/playerMovementMachine'
import { PlayerEventContext } from '../context/playerEventContext'

export default function Player() {
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState, sendPlayerEvent] = useActor(
		playerEventService.playerEventState,
	)
	const [xPos, setXPos] = useState(10)
	const [yPos, setYPos] = useState(325)
	const [currentWalkingAnimation, sendWalkingAnimationEvent] = useMachine(
		playerAnimationMachine,
	)
	const [movementFrames, sendMovementFrames] = useMachine(playerMovementMachine)
	useEffect(() => {
		if (currentPlayerState.matches('walking')) {
			sendMovementFrames('MOVE')
			const playerStateValue = currentPlayerState.value as Record<
				string,
				string
			>
			const [walkingTo] = Object.keys(playerStateValue.walking)
			switch (playerStateValue.walking[walkingTo]) {
				case 'walkingRight':
					sendWalkingAnimationEvent('WALK', { direction: 'right' })
					break
				default:
					throw new Error('Invalid walking state!')
			}
		} else {
			sendWalkingAnimationEvent('IDLE')
			sendMovementFrames('IDLE')
		}
	}, [currentPlayerState, sendWalkingAnimationEvent, sendMovementFrames])
	useEffect(() => {
		if (currentWalkingAnimation.matches('walking')) {
			const delta = 2
			switch (currentWalkingAnimation.context.facing) {
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
	}, [currentWalkingAnimation, movementFrames])
	return (
		<div
			tabIndex={0}
			style={{
				position: 'relative',
				bottom: `${yPos}px`,
				left: `${xPos}px`,
				height: '47px',
			}}>
			<Image
				src={
					currentWalkingAnimation.matches('idle')
						? player.idle[currentWalkingAnimation.context.facing]
						: player.walking[currentWalkingAnimation.context.facing][
								currentWalkingAnimation.context.animationFrame
						  ]
				}
				width={35}
				height={47}
				alt="player"
			/>
		</div>
	)
}
