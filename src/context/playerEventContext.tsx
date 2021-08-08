import { createContext } from 'react'
import { useInterpret } from '@xstate/react'
import {
	playerEventMachine,
	PlayerEvent,
	PlayerEventMachineContext,
} from '../machines/playerEventMachine'
import { Interpreter } from 'xstate'

type PlayerEventMachineInterpreter = {
	playerEventState: Interpreter<PlayerEventMachineContext, any, PlayerEvent>
}

export const PlayerEventContext = createContext<PlayerEventMachineInterpreter>(
	{} as PlayerEventMachineInterpreter,
)

export const PlayerEventProvider = ({ children }) => {
	const playerEventState = useInterpret(playerEventMachine)

	return (
		<PlayerEventContext.Provider value={{ playerEventState }}>
			{children}
		</PlayerEventContext.Provider>
	)
}
