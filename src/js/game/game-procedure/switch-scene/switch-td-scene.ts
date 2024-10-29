import { Unsubscribable } from "rxjs";

import { DOMSceneBinder } from "../../../dom-scenes/dom-scene-binder";
import { TDScene } from "../../../td-scenes/td-scene";
import { TDSceneBinder } from "../../../td-scenes/td-scene-binder";

/** シーン切り替えパラメータ */
type Params = {
  /** 3Dシーンバインダ */
  tdSceneBinder: TDSceneBinder;
  /** DOMシーンバインダ */
  domSceneBinder: DOMSceneBinder;
  /** 切り替え先の3Dシーン */
  scene: TDScene;
  /** バインドするシーンに関連するアンサブスクライバ */
  unsubscribers: Unsubscribable[];
};

/**
 * 3Dシーンに切り替える
 * 切り替え前にDOMシーンを表示していた場合、そのシーンを破棄する
 * 本関数はこのフォルダ以外では呼び出してはならない
 * @param params シーン切り替えパラメータ
 */
export const switchTDScene = (params: Params) => {
  const { tdSceneBinder, domSceneBinder, scene, unsubscribers } = params;
  if (domSceneBinder.isSceneBound()) {
    domSceneBinder.dispose();
  }
  tdSceneBinder.bind(scene, unsubscribers);
};
