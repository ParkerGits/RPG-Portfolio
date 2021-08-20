import { useActor } from '@xstate/react'
import { useContext } from 'react'
import { PlayerEventContext } from '../context/playerEventContext'

export default function Start() {
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState, sendPlayerEvent] = useActor(
		playerEventService.playerEventState,
	)
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div
				className="w-1/3 h-1/6 bg-opacity-75 bg-black flex flex-col items-center justify-center rounded-xl border-2 border-white"
				style={{ borderStyle: 'ridge' }}>
				<h1
					className="font-rpg text-4xl text-white text-center"
					style={{ textShadow: '0px 4px black' }}>
					Parker&apos;s Portfolio
				</h1>
				<button
					className="font-rpg text-2xl text-white px-2 rounded-md animate-pulse"
					style={{ textShadow: '0px 4px black' }}
					onClick={() => sendPlayerEvent('START')}>
					New Game
				</button>
				<h3
					className="font-rpg text-white text-center"
					style={{ textShadow: '0px 4px black' }}>
					⚠ sound will play ⚠
				</h3>
			</div>
		</div>
	)
}
