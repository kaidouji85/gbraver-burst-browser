// @flow
import type {LoadingActions} from "../../../resource/loading-actions";
import type {Stream} from "../../../stream/stream";
import {bindScene} from "../bind-scene";
import {discardCurrentScene} from "../discard-current-scene";
import type {DOMScenesProps} from "../props";
import {Loading} from "../scene/loading";

/**
 * 新しくローディング画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param loading 読み込み状況ストリーム
 * @return 開始されたローディング画面
 */
export function startLoading(props: DOMScenesProps, loading: Stream<LoadingActions>): Loading {
  discardCurrentScene(props);
  const scene = new Loading(loading);
  bindScene(props, scene);
  return scene;
}