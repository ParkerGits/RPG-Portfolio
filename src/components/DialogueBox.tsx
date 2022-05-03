import Image from "next/image";
import { useEffect, useContext } from "react";
import {
  dialogueMachine,
  DialogueMachineContext,
  DialogueEvent,
  DialogueTypestate,
} from "../machines/dialogueMachine";
import { useMachine, useActor } from "@xstate/react";
import { PlayerEventContext } from "../context/playerEventContext";
import { dialogue } from "../dialogue";

export default function DialogueBox() {
  const [currentDialogue, sendDialogueEvent] = useMachine<
    DialogueMachineContext,
    DialogueEvent,
    DialogueTypestate
  >(dialogueMachine);
  const playerEventState = useContext(PlayerEventContext);
  const [currentPlayerState, sendPlayerEvent] = useActor(playerEventState);
  const handleProceed = () => {
    if (currentDialogue.matches({ dialogue: "displayFinalPanel" })) {
      sendDialogueEvent("FINISH_DIALOGUE");
      sendPlayerEvent("FINISH_DIALOGUE");
    }
    sendDialogueEvent("NEXT");
  };
  useEffect(() => {
    console.log(currentDialogue.value);
    if (currentPlayerState.matches("dialogue")) {
      const dialogueEvent = (currentPlayerState.value as Record<string, string>)
        .dialogue;
      sendDialogueEvent("DIALOGUE", {
        speaker: dialogue[dialogueEvent].speaker,
        text: dialogue[dialogueEvent].text,
        face: dialogue[dialogueEvent].face,
      });
    }
  }, [currentPlayerState, sendDialogueEvent, currentDialogue]);

  const inDialogue = currentDialogue.matches("dialogue");
  return (
    <div
      className="flex flex-col"
      style={{
        width: "979px",
        bottom: 0,
        height: "20%",
        opacity: inDialogue ? 100 : 0,
        transition: "0.25s ease-in-out",
        display: currentPlayerState.matches("shopMenu") ? "none" : "block",
      }}
    >
      <div
        className={`h-1/6 border ${
          inDialogue ? "border-2" : "border-0"
        } w-1/6 bg-blue-800 border-white border-b-0 rounded-t-lg ml-4 text-center text-white font-mono bg-opacity-90 flex items-center justify-center`}
        style={{
          borderStyle: "ridge",
          transition: "0.2s ease-in-out",
        }}
      >
        {inDialogue && (
          <h1
            className="text-lg font-rpg"
            style={{ textShadow: "0px 2px black" }}
          >
            {currentDialogue.context.speaker}
          </h1>
        )}
      </div>
      <div
        onClick={inDialogue ? handleProceed : null}
        className={`h-5/6 border-${
          inDialogue ? "2" : "0"
        } bg-blue-800 border-white rounded-t-lg flex flex-row bg-opacity-90 ${
          inDialogue && "cursor-pointer"
        }`}
        style={{ transition: "0.2s ease-in-out", textShadow: "0px 2px black" }}
      >
        {inDialogue && (
          <div className="flex items-center h-full min-w-max ml-3">
            <Image
              src={currentDialogue.context.face}
              height="110px"
              width="110px"
              alt={`${currentDialogue.context.speaker} Face Image`}
              priority={true}
            />
          </div>
        )}
        {inDialogue && (
          <p className="font-rpg mt-3 text-white w-full text-lg">
            {currentDialogue.context.text[currentDialogue.context.currPanel]}
          </p>
        )}
        {inDialogue && (
          <div className="self-end mr-2">
            <p className="font-rpg text-white text-xl">&gt;</p>
          </div>
        )}
      </div>
    </div>
  );
}
