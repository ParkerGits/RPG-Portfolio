import { useActor } from '@xstate/react'
import { useContext, useEffect } from 'react'
import { PlayerEventContext } from '../context/playerEventContext'
import useSound from 'use-sound'

export default function SoundHandler() {
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState, sendPlayerEvent] = useActor(
		playerEventService.playerEventState,
	)
	const [playEnter] = useSound('/sounds/Enter.mp3')
	const [playDoorOpen] = useSound('/sounds/DoorOpen.mp3')
	const [playBgm] = useSound('/sounds/ShopBGM.mp3')

	useEffect(() => {
		switch (true) {
			case currentPlayerState.matches('openingDoor'):
				playDoorOpen()
				break
			case currentPlayerState.matches('entering'):
				playEnter()
				break
			case currentPlayerState.matches('startBgm'):
				playBgm()
				break
			default:
				break
		}
	}, [currentPlayerState, playDoorOpen, playEnter, playBgm])
	return <></>
}
