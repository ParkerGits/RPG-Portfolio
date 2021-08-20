import { PlayerEventContext } from '../context/playerEventContext'
import { useContext } from 'react'
import { useActor } from '@xstate/react'

export default function ShopMenu() {
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState, sendPlayerEvent] = useActor(
		playerEventService.playerEventState,
	)
	if (currentPlayerState.matches('shopMenu')) return null
}
