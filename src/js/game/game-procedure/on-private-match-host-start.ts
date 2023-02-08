import { PlayerSelect } from "../../dom-scenes/player-select";
import { waitTime } from "../../wait/wait-time";
import { playerSelectConnector } from "../action-connector/player-select-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import { GameProps } from "../game-props";
import { getPlayableArmdozers } from "./get-playable-armdozers";

/**
 * プライベートマッチ（ホスト）スタート
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onPrivateMatchHostStart(props: GameProps): Promise<void> {
  props.inProgress = {
    type: "PrivateMatchHost",
    subFlow: {
      type: "PlayerSelect"
    }
  };
  props.domDialogBinder.hidden();
  await props.fader.fadeOut();
  const scene = new PlayerSelect(
    props.resources,
    getPlayableArmdozers(props)
  );
  props.domSceneBinder.bind(scene, playerSelectConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
}
