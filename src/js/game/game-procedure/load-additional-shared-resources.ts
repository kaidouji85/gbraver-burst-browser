import { Loading } from "../../dom-scenes/loading";
import { loadSharedResources } from "../../resource/loading/load-shared-resources";
import { mergeResources } from "../../resource/loading/merge-resources";
import { GameProps } from "../game-props";
import { switchLoading } from "./switch-scene/switch-loading";

/**
 * 追加でSharedリソースを読み込む
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @returns 処理完了したら発火するPromise
 */
export async function loadAdditionalSharedResources(props: GameProps): Promise<void> {
  await props.fader.fadeOut();
  const resourceLoading = loadSharedResources(props);
  const scene = new Loading(resourceLoading.loading);
  switchLoading(props, scene);
  await props.fader.fadeIn();
  const loaded = await resourceLoading.resources;
  props.resources = mergeResources({ resources: props.resources, loaded });
  props.isSharedResourcesLoaded = true;
}
