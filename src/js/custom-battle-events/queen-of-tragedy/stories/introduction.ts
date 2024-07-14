import { delay } from "../../../animation/delay";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import {
  enemyPilotShoutInInnerHTML,
  playerPilotShoutInInnerHTML,
} from "../../pilot-shout";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import { synchronizedBow } from "../../synchronized-bow";
import { synchronizedUpright } from "../../synchronized-upright";
import { waitUntilWindowPush } from "../../wait-until-window-push";
import { yoroshikuOnegaiShimasu } from "../../yoroshiku-onegai-shimasu";

/**
 * イントロダクション
 * @param props イベントプロパティ
 */
export async function introduction(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「時間はまだある`],
    [`ユウヤ 私とも${wbr}手合わせ願おうか」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「いいぜ`],
    [`去年は${wbr}一瞬で${wbr}ケリが${wbr}ついた${wbr}からな`],
    [`俺も${wbr}不完全燃焼${wbr}だったんだ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「……ガイ`],
    [`この試合${wbr}よう観とくんやで」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [["ガイ", `「……！！」`]]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「全国ベスト2の${wbr}直接対決`],
    [`こんなん${wbr}滅多に${wbr}拝めへん」`],
  ]);

  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  props.view.dom.rightMessageWindow.messages(["シンヤ", "「姿勢を正して"]);
  await synchronizedUpright(props).play();
  props.view.dom.rightMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.se.play(props.sounds.sendMessage);
  props.view.dom.rightMessageWindow.nextMessageIconVisible(false);
  props.view.dom.rightMessageWindow.scrollUp();
  props.view.dom.rightMessageWindow.messages(["礼！！」"]);
  await delay(500).play();

  await refreshConversation(props);
  playerPilotShoutInInnerHTML(props, "Yuuya", yoroshikuOnegaiShimasu());
  enemyPilotShoutInInnerHTML(props, "Tsubasa", yoroshikuOnegaiShimasu());
  await synchronizedBow(props).chain(delay(500)).play();
  invisibleAllMessageWindows(props);
}
