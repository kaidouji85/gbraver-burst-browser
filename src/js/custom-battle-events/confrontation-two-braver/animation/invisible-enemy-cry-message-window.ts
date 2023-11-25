import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";

/**
 * 敵叫びメッセージウィンドウを非表示にする
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const invisibleEnemyCryMessageWindow = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    props.view.dom.enemyCryMessageWindow.visible(false);
  });
