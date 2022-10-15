// @flow
import {bindScene} from "../bind-scene";
import {discardCurrentScene} from "../discard-current-scene";
import type {DOMScenesProps} from "../props";
import type {TutorialTitleParams} from "../scene/tutorial-title";
import {TutorialTitle} from "../scene/tutorial-title";

/**
 * チュートリアルタイトル画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param params 画面パラメータ
 * @return 開始されたチュートリアルタイトル画面
 */
export async function startTutorialTitle(props: DOMScenesProps, params: TutorialTitleParams): Promise<TutorialTitle> {
  discardCurrentScene(props);
  const scene = new TutorialTitle(params);
  bindScene(props, scene);
  await scene.waitUntilLoaded();
  return scene;
}