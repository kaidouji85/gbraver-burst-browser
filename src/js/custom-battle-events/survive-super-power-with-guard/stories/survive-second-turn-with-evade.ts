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
import { RAITO_SHIBAKI } from "./raito-shibaki";

/**
 * 2ターン目で回避して生き残った
 * @param props イベントプロパティ
 */
export async function surviveSecondTurnWithEvade(
  props: CustomBattleEventProps,
) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「6回避だと！！`],
    [`当たれば${wbr}即死の${wbr}攻撃も これでは」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    [
      "ツバサ",
      `「なるほど ならば${wbr}回避か${wbr}ガードで${wbr}凌ぐ${wbr}までだ`,
    ],
    [
      highlight(`攻撃と防御が同じ`) +
        `ならガードで${wbr}` +
        highlight(`ダメージ半減`) +
        `${wbr}だ」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, RAITO_SHIBAKI);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
