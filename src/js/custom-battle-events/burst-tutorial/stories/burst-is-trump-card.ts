import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー バーストは切り札
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function burstIsTrumpCard(
  props: CustomBattleEventProps,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      `「シンヤ${wbr} 今は${wbr}まだ${wbr}バーストする${wbr}タイミングでは${wbr}ない」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「へ？${wbr} どうして${wbr}ッスか」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「バーストすれば${wbr} バッテリーを${wbr}5回復${wbr}できる`],
    [
      `しかし${wbr}今は${wbr}バッテリーが${wbr}満タン${wbr}だから${wbr} バーストしても${wbr}意味が${wbr}ないんだ」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", `「なるほど${wbr} 了解ッス」`]]);
  await refreshConversation(props, 100);
}
