import { useActor } from '@xstate/react'
import { useContext } from 'react'
import DialogueBox from '../components/DialogueBox'
import Player from '../components/Player'
import Shopkeeper from '../components/Shopkeeper'
import ShopMenu from '../components/ShopMenu'
import { PlayerEventContext } from '../context/playerEventContext'
import Start from '../components/Start'

export default function Home() {
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState] = useActor(playerEventService.playerEventState)
	return (
		<div className="flex items-center justify-center bg-black h-screen">
			<div
				className="bg-shop bg-no-repeat bg-cover bg-center flex flex-col-reverse"
				style={{
					height: '748px',
					width: '979px',
					overflow: 'hidden',
				}}>
				{currentPlayerState.matches('ready') ? (
					<Start />
				) : (
					<>
						<DialogueBox />
						<Player />
					</>
				)}
			</div>
		</div>
	)
}
