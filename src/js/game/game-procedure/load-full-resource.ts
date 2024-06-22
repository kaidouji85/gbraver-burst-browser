import { Loading } from "../../dom-scenes/loading";
import {
  developingFullResourceDifferentialLoad,
  fullResourceDifferentialLoad,
} from "../../resource/loading/full-resource-differential-load";
import type { GameProps } from "../game-props";
import { reflectSoundVolume } from "./reflect-sound-volume";
import { switchLoading } from "./switch-scene/switch-loading";

/**
 * フルリソース読み込みを行うヘルパー関数
 * リソース読み込み中は専用画面に遷移し、読み込んだ音リソースには音量設定が反映される
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @returns 処理完了したら発火するPromise
 */
export async function loadFullResource(props: GameProps): Promise<void> {
  await props.fader.fadeOut();
  const resourceLoading = props.shouldLoadDevelopingResource
    ? developingFullResourceDifferentialLoad(props.resources)
    : fullResourceDifferentialLoad(props.resources);
  const scene = new Loading(resourceLoading.loading);
  switchLoading(props, scene);
  await props.fader.fadeIn();
  props.resources = await resourceLoading.resources;
  const config = await props.config.load();
  await reflectSoundVolume(props, config);
  props.isFullResourceLoaded = true;
}
