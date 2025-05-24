import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * 3ターン目で負けた
 * @param props イベントプロパティ
 */
export async function thirdTurnLose(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「どや わいらの${wbr}勝ちや」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「あの攻撃をガード出来ていれば勝機はあった`],
    [`攻撃と防御で同じ数字だった場合はダメージ半減`],
    [`5防御していれば即死は免れたはずだ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
}
