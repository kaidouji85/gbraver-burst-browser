import { delay } from "../../../animation/delay";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import { synchronizedBow } from "../../synchronized-bow";
import { synchronizedUpright } from "../../synchronized-upright";
import { waitUntilWindowPush } from "../../wait-until-window-push";

/**
 * 導入
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function introduction(
  props: CustomBattleEventProps,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「全国大会の覇者 ユウヤさん"],
    ["……俺はこの人に憧れて 機動倶楽部に入ったんだ」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「……シンブレイバーか"],
    ["本来 ブレイバーの称号は 全国一位のロボに与えられるもの"],
    ["それを こんなひよっ子が名乗るとは"],
    ["……面白い 気に入ったぞ シンヤ！！"],
    ["シンブレイバーの力 とくと拝見させてもらおうか」"],
  ]);
  invisibleAllMessageWindows(props);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「間もなく 都立大田高校 府立洛内高校 の練習試合を行う"],
  ]);
  props.view.dom.rightMessageWindow.messages(["姿勢を正して"]);
  await synchronizedUpright(props).play();
  props.view.dom.rightMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.sounds.sendMessage.sound.play();
  props.view.dom.rightMessageWindow.nextMessageIconVisible(false);
  props.view.dom.rightMessageWindow.scrollUp();
  props.view.dom.rightMessageWindow.messages(["礼！！」"]);
  await delay(500).play();
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Yuuya");
  props.view.dom.leftMessageWindow.messages([
    "ユウヤ",
    "「よろしくお願いします」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  props.view.dom.rightMessageWindow.messages([
    "シンヤ",
    "「よろしくお願いします」",
  ]);
  await synchronizedBow(props).chain(delay(500)).play();
  invisibleAllMessageWindows(props);
}
