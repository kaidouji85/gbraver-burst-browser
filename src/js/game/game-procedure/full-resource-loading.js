// @flow
import {fullResourceLoadingFrom} from "../../resource";
import type {GameProps} from "../game-props";
import {reflectSoundVolume} from "../reflect-sound-volume";

/**
 * 全リソース読み込みを行うヘルパー関数
 * リソース読み込み中は専用画面に遷移する
 * 読み込んだ音リソースには音量設定が反映される
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理完了したら発火するPromise
 */
export async function fullResourceLoading(props: GameProps): Promise<void> {
  await props.fader.fadeOut();
  const resourceLoading = fullResourceLoadingFrom(props.resources);
  props.domScenes.startLoading(resourceLoading.loading);
  await props.fader.fadeIn();
  props.resources = await resourceLoading.resources;
  const config = await props.config.load();
  reflectSoundVolume(props.resources, config);
  props.isFullResourceLoaded = true;
}