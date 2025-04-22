import { Loading } from "../../dom-scenes/loading";
import { mergeResources } from "../../resource/loading/merge-resources";
import { GameProps } from "../game-props";
import { switchLoading } from "./switch-scene/switch-loading";

/**
 * Sharedリソースの読み込みが完了するまで待機する。
 * リソースが読み込まれていない場合はローディング画面を表示して待機し、
 * リソースが読み込まれている場合は何もしない。
 * 本関数ではフェードアウトを行い、props.sharedResourceStateを更新する。
 * @param props ゲームプロパティ
 * @returns 処理完了したら発火するPromise
 */
export async function waitUntilSharedResourcesLoaded(props: GameProps) {
  if (props.sharedResourceState.type !== "Loading") {
    return;
  }

  await props.fader.fadeOut();
  const { resourceLoading } = props.sharedResourceState;
  const scene = new Loading(resourceLoading.loading);
  switchLoading(props, scene);
  await props.fader.fadeIn();
  const loaded = await resourceLoading.resources;
  props.resources = mergeResources({ resources: props.resources, loaded });
  props.sharedResourceState = { type: "Complete" };
}
