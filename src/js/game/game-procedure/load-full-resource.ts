import { Loading } from "../../dom-scenes/loading";
import {
  developingFullResourceDifferentialLoad,
  fullResourceDifferentialLoad,
} from "../../resource/loading/full-resource-differential-load";
import type { GameProps } from "../game-props";
import { switchLoading } from "./switch-scene/switch-loading";

/**
 * フルリソース読み込みを行うヘルパー関数
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
  props.isFullResourceLoaded = true;
}
