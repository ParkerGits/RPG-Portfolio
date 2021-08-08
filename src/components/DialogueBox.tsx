import Image from 'next/image'
import { useEffect, useContext } from 'react'
import {
	dialogueMachine,
	DialogueMachineContext,
	DialogueEvent,
	DialogueTypestate,
} from '../machines/dialogueMachine'
import { useMachine, useActor } from '@xstate/react'
import { PlayerEventContext } from '../context/playerEventContext'
import { dialogue } from '../dialogue'

export default function DialogueBox() {
	const [currentDialogue, sendDialogueEvent] = useMachine<
		DialogueMachineContext,
		DialogueEvent,
		DialogueTypestate
	>(dialogueMachine)
	const playerEventService = useContext(PlayerEventContext)
	const [currentPlayerState, sendPlayerEvent] = useActor(
		playerEventService.playerEventState,
	)
	const handleProceed = () => {}
	useEffect(() => {
		console.log(currentDialogue.value)
		if (currentPlayerState.matches('dialogue')) {
			const dialogueEvent = (currentPlayerState.value as Record<string, string>)
				.dialogue
			sendDialogueEvent('DIALOGUE', {
				speaker: dialogue[dialogueEvent].speaker,
				text: dialogue[dialogueEvent].text,
				face: dialogue[dialogueEvent].face,
			})
		}
	}, [currentPlayerState, sendDialogueEvent, currentDialogue])
	return (
		<div
			className="flex flex-col"
			style={{
				width: '979px',
				bottom: 0,
				height: '20%',
				opacity: currentDialogue.matches('dialogue') ? 100 : 0,
				transition: '0.25s ease-in-out',
			}}>
			<div
				className={`h-1/6 border-${
					currentDialogue.matches('dialogue') ? '2' : '0'
				} w-1/6 bg-blue-800 border-white border-b-0 rounded-t-lg ml-4 text-center text-white font-mono bg-opacity-90 flex items-center justify-center`}
				style={{
					borderStyle: 'ridge',
					transition: '0.2s ease-in-out',
				}}>
				{currentDialogue.matches('dialogue') && (
					<h1
						className="text-lg font-rpg"
						style={{ textShadow: '0px 2px black' }}>
						{currentDialogue.context.speaker}
					</h1>
				)}
			</div>
			<div
				className={`h-5/6 border-${
					currentDialogue.matches('dialogue') ? '2' : '0'
				} bg-blue-800 border-white rounded-t-lg flex flex-row bg-opacity-90`}
				style={{ transition: '0.2s ease-in-out', textShadow: '0px 2px black' }}>
				{currentDialogue.matches('dialogue') && (
					<div className="flex items-center h-full min-w-max ml-3">
						<Image
							src={currentDialogue.context.face}
							height="110px"
							width="110px"
							alt={`${currentDialogue.context.speaker} Face Image`}
						/>
					</div>
				)}
				{currentDialogue.matches('dialogue') && (
					<p className="font-rpg mt-3 text-white w-full text-lg">
						{currentDialogue.context.text[currentDialogue.context.currPanel]}
					</p>
				)}
				<div className="self-end mr-2">
					<button
						className="font-rpg text-white text-xl"
						onClick={() => {
							if (currentDialogue.context.onFinalPanel) {
								sendDialogueEvent('NEXT')
								sendPlayerEvent('FINISH_DIALOGUE')
							}
							sendDialogueEvent('NEXT')
						}}>
						&gt;
					</button>
				</div>
			</div>
		</div>
	)
}
