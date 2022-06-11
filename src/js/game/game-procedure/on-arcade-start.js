// @flow
import {fullResourceLoading} from "./full-resource-loading";
import {reflectSoundVolume} from "../reflect-sound-volume";
import type {GameProps} from "../game-props";

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
    const config = await props.config.load();
    reflectSoundVolume(props.resources, config);
  }

  props.inProgress = {type: 'NPCBattle', subFlow: {type: 'PlayerSelect'}};
  await props.fader.fadeOut();
  await props.domScenes.startPlayerSelect(props.resources);
  await props.fader.fadeIn();
}