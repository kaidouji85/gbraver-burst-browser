// @flow
import { Loading } from "../../dom-scenes/loading";
import { fullResourceLoadingFrom } from "../../resource/loading/full-resource-loading";
import { loadingConnector } from "../dom-scene-binder/action-connector/loading-connector";
import type { GameProps } from "../game-props";
import { reflectSoundVolume } from "../reflect-sound-volume";

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
  const scene = new Loading(resourceLoading.loading);
  props.domSceneBinder.bind(scene, loadingConnector);
  await props.fader.fadeIn();
  props.resources = await resourceLoading.resources;
  const config = await props.config.load();
  reflectSoundVolume(props.resources, config);
  props.isFullResourceLoaded = true;
}
