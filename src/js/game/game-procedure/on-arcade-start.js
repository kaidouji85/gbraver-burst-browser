// @flow
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
  await props.domScenes.startPlayerSelect(props.resources);
  await props.fader.fadeIn();
}
