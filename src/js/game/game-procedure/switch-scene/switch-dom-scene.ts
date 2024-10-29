import { Unsubscribable } from "rxjs";

import { DOMScene } from "../../../dom-scenes/dom-scene";
import { GameProps } from "../../game-props";

/**
 * DOMシーンに切り替える
 * 切り替え前に3Dシーンを表示していた場合、そのシーンを破棄する
 * 本関数はこのフォルダ以外では呼び出してはならない
 * @param props ゲームプロパティ
 * @param scene DOMシーン
 * @param unsubscribers バインドするシーンに関連するアンサブスクライバ
 */
export const switchDomScene = (
  props: GameProps,
  scene: DOMScene,
  unsubscribers: Unsubscribable[],
): void => {
  if (props.tdBinder.isSceneBound()) {
    props.tdBinder.dispose();
  }
  props.domSceneBinder.bind(scene, unsubscribers);
};
