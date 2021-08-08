import { shopkeeper } from './characters'

export type DialogueEvent = {
	speaker: string
	text: string[]
	face: string
}

export type Dialogue = { [key: string]: DialogueEvent }

export const dialogue: Dialogue = {
	shopkeeperGreeting: {
		speaker: 'Shopkeeper',
		text: ['Hello! Welcome to my shop.', 'Take a look around!'],
		face: shopkeeper.face,
	},
	shopkeeperDialogue: {
		speaker: 'Shopkeeper',
		text: ['Would you like to take a look at my wares?'],
		face: shopkeeper.face,
	},
}
