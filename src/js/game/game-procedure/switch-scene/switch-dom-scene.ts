import { Unsubscribable } from "rxjs";

import { DOMScene } from "../../../dom-scenes/dom-scene";
import { DOMSceneBinder } from "../../../dom-scenes/dom-scene-binder";
import { TDSceneBinder } from "../../../td-scenes/td-scene-binder";

/** シーン切り替えパラメータ */
type Params = {
  /** DOMシーンバインダ */
  domSceneBinder: DOMSceneBinder;
  /** 3Dシーンバインダ */
  tdSceneBinder: TDSceneBinder;
  /** 切り替え先のDOMシーン */
  scene: DOMScene;
  /** バインドするシーンに関連するアンサブスクライバ */
  unsubscribers: Unsubscribable[];
};

/**
 * DOMシーンに切り替える
 * 切り替え前に3Dシーンを表示していた場合、そのシーンを破棄する
 * 本関数はこのフォルダ以外では呼び出してはならない
 * @param params シーン切り替えパラメータ
 */
export const switchDOMScene = (params: Params): void => {
  const { domSceneBinder, tdSceneBinder, scene, unsubscribers } = params;
  if (tdSceneBinder.isSceneBound()) {
    tdSceneBinder.dispose();
  }
  domSceneBinder.bind(scene, unsubscribers);
};
