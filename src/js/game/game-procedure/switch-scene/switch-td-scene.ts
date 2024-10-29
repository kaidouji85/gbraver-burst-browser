import { Unsubscribable } from "rxjs";

import { TDScene } from "../../../td-scenes/td-scene";
import { GameProps } from "../../game-props";

/**
 * 3Dシーンに切り替える
 * 切り替え前にDOMシーンを表示していた場合、そのシーンを破棄する
 * 本関数はこのフォルダ以外では呼び出してはならない
 * @param props ゲームプロパティ
 * @param scene 3Dシーン
 * @param unsubscribers バインドするシーンに関連するアンサブスクライバ
 */
export const switchTdScene = (
  props: GameProps,
  scene: TDScene,
  unsubscribers: Unsubscribable[],
) => {
  if (props.domSceneBinder.isSceneBound()) {
    props.domSceneBinder.dispose();
  }
  props.tdSceneBinder.bind(scene, unsubscribers);
};
