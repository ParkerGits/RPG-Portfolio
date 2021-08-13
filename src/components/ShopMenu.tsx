import { PlayerEventContext } from '../context/playerEventContext'
import { useContext } from 'react'
import { useActor } from '@xstate/react'

export default function ShopMenu() {
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState, sendPlayerEvent] = useActor(
		playerEventService.playerEventState,
	)
	return (
		<div
			className="relative h-full w w-full bg-blue-800 grid grid-cols-2"
			style={{
				gridTemplateRows: 'repeat(12, minmax(0, 1fr))',
			}}>
			<div className="col-span-2 row-span-2 font-rpg text-center text-white border border-white">
				Parker's Portfolio Shop
			</div>
			<div className="col-span-2 row-span-1 font-rpg text-center text-white border border-white">
				Parker's Portfolio Shop
			</div>
			<div
				className="col-span-1 font-rpg text-center text-white border border-white"
				style={{ gridRow: 'span 9 / span 9' }}>
				Parker's Portfolio Shop
			</div>
			<div
				className="col-span-1 font-rpg text-center text-white border border-white"
				style={{ gridRow: 'span 9 / span 9' }}>
				Parker's Portfolio Shop
			</div>
		</div>
	)
}
