import { PlayerSelect } from "../../dom-scenes/player-select";
import { waitTime } from "../../wait/wait-time";
import { playerSelectConnector } from "../action-connector/player-select-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props";
import { getPlayableArmdozers } from "../playable-amdozers";
import { getPlayablePilots } from "../playable-pilots";
import { loadFullResource } from "./load-full-resource";

/**
 * アーケードモード開始
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onArcadeStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  props.inProgress = {
    type: "NPCBattle",
    npcBattle: {
      type: "PlayerSelect",
    },
  };
  await props.fader.fadeOut();
  const scene = new PlayerSelect({
    ...props,
    armdozerIds: getPlayableArmdozers(props),
    pilotIds: getPlayablePilots(props),
  });
  props.domSceneBinder.bind(scene, playerSelectConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
}
