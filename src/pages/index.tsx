import { useActor } from "@xstate/react";
import { useContext } from "react";
import DialogueBox from "../components/DialogueBox";
import Player from "../components/Player";

import ShopMenu from "../components/ShopMenu";
import { PlayerEventContext } from "../context/playerEventContext";
import Start from "../components/Start";

export default function Home() {
  const playerEventState = useContext(PlayerEventContext);
  const [currentPlayerState] = useActor(playerEventState);
  return (
    <div className="flex items-center justify-center bg-black min-h-screen">
      <div
        className="bg-shop bg-no-repeat bg-cover bg-center flex flex-col-reverse"
        style={{
          height: "748px",
          width: "979px",
          overflow: "hidden",
        }}
      >
        <ShopMenu />
        {currentPlayerState.matches("ready") ? (
          <Start />
        ) : (
          <>
            <DialogueBox />
            <Player />
          </>
        )}
      </div>
    </div>
  );
}
