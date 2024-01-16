import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー プレイヤーの勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const playerWin = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「やめ!!"],
    ["この試合 ……シンヤの勝ち」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「やった 上級生に勝てたッス」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", "「下級生やと思て 舐めとったわ"],
    ["さすがやな 大田高校のエース君」"],
  ]);
  await refreshConversation(props, 200);
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", "「……シンブレイバーか"],
    ["野暮用で関東まで来てみたが 面白い奴を見つけたな」"],
  ]);
  invisibleAllMessageWindows(props);
};
