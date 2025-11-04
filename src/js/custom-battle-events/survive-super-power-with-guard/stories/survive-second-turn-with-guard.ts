import { wbr } from "../../../dom/wbr";
import { highlight } from "../../../game-dom/message-window/dom/highlight";
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
import { RAITO_AKANYARO } from "./raito-akanyaro";

/**
 * 2ターン目でガードして生き残った
 * @param props イベントプロパティ
 */
export async function surviveSecondTurnWithGuard(
  props: CustomBattleEventProps,
) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「バカな`],
    [`新型ロボの${wbr}攻撃で${wbr}即死しない${wbr}だと」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「悪いな ガイ君`],
    [
      `${highlight(`攻撃と防御が同じ`)}なら ガードで${wbr}${highlight(`ダメージ半減`)}${wbr}だ」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, RAITO_AKANYARO);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
