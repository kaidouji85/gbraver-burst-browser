import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";
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
    [`即死級の${wbr}攻撃力も これでは……」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, RAITO_SHIBAKI);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
