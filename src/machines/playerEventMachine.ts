import { createMachine, assign } from 'xstate'

export type PlayerEventMachineContext = {
  visible: boolean
  bgmPlaying: boolean
}

export type PlayerEvent =
  | { type: 'FINISH_DIALOGUE' }
  | { type: 'START' }
  | { type: 'EXIT_SHOPPING' }

export const playerEventMachine = createMachine<
  PlayerEventMachineContext,
  PlayerEvent
>({
  id: 'playerState',
  context: {
    visible: false,
    bgmPlaying: false,
  },
  initial: 'ready',
  states: {
    ready: {
      on: {
        START: 'openingDoor',
      },
    },
    openingDoor: {
      after: {
        1000: 'entering',
      },
    },
    entering: {
      entry: (context) => (context.visible = true),
      after: {
        2000: 'startBgm',
      },
    },
    startBgm: {
      entry: (context) => (context.bgmPlaying = true),
      after: {
        500: '#shopkeeperGreeting',
      },
    },
    dialogue: {
      states: {
        shopkeeperGreeting: {
          id: 'shopkeeperGreeting',
          on: {
            FINISH_DIALOGUE: '#walkingToShopkeeper',
          },
        },
        shopkeeperOpenShop: {
          id: 'shopkeeperOpenShop',
          on: {
            FINISH_DIALOGUE: '#shopMenu',
          },
        },
        shopkeeperExitShop: {
          id: 'shopkeeperExitShop',
          on: {
            FINISH_DIALOGUE: '#shopMenu',
          },
        },
      },
    },
    walking: {
      states: {
        walkingToShopkeeper: {
          id: 'walkingToShopkeeper',
          initial: 'walkingRight',
          states: {
            walkingRight: {
              after: {
                3250: '#shopkeeperOpenShop',
              },
            },
          },
        },
        walkingToNPC1: {
          id: 'walkingToNPC1',
          states: {},
        },
      },
    },
    shopMenu: {
      id: 'shopMenu',
      on: {
        EXIT_SHOPPING: '#shopkeeperExitShop',
      },
    },
  },
})
