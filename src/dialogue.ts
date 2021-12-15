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
  shopkeeperOpenShop: {
    speaker: 'Shopkeeper',
    text: ['Would you like to take a look at my wares?'],
    face: shopkeeper.face,
  },
  shopkeeperExitShop: {
    speaker: 'Shopkeeper',
    text: [
      'Did something catch your eye?',
      "At the moment, there's nothing more to this shop. We're looking to eventually bring in more people for you to interact with.",
      'Until then, you may continue to admire my wares!',
    ],
    face: shopkeeper.face,
  },
}
