// @flow
import { waitTime } from "../../wait/wait-time";
import { playerSelectConnector } from "../dom-scene-binder/action-connector/player-select-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import { PlayerSelect } from "../dom-scene-binder/scene/player-select";
import type { GameProps } from "../game-props";
import { fullResourceLoading } from "./full-resource-loading";

/**
 * アーケードモード開始
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onArcadeStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
  }

  props.inProgress = { type: "NPCBattle", subFlow: { type: "PlayerSelect" } };
  await props.fader.fadeOut();
  const scene = new PlayerSelect(props.resources);
  props.domScenes.bind(scene, playerSelectConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
}
