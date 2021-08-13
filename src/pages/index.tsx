import DialogueBox from '../components/DialogueBox'
import Player from '../components/Player'
import Shopkeeper from '../components/Shopkeeper'

export default function Home() {
	return (
		<div className="flex items-center justify-center bg-black h-screen">
			<div
				className="bg-shop bg-no-repeat bg-cover bg-center flex flex-col-reverse"
				style={{
					height: '748px',
					width: '979px',
					overflow: 'hidden',
				}}>
				<DialogueBox />
				<Player />
				<Shopkeeper />
			</div>
		</div>
	)
}
