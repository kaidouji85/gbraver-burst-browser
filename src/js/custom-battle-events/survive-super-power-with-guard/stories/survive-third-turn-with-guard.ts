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

/**
 * 3ターン目でガードして生き残った
 * @param props イベントプロパティ
 */
export async function surviveThirdTurnWithGuard(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「バカな`],
    [`新型ロボの攻撃を受けたのに即死しないだと`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「残念だったな ガイ君`],
    [`攻撃側と防御側で同じ数字を出した場合はガード`],
    [`ダメージは半減される」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「(ガイの奴 こちらの情報をペラペラと`],
    [`オーナーの息子やなかったらシバき倒しとるところや)`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
