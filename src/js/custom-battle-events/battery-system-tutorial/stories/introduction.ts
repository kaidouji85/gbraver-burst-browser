import { delay } from "../../../animation/delay";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { createAnimationPlay } from "../../../td-scenes/battle/play-animation";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
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
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function introduction(props: CustomBattleEventProps) {
  const playAnimation = createAnimationPlay(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「これより操縦訓練を${wbr}開始する`],
  ]);
  props.view.dom.leftMessageWindow.messages(["姿勢を正して"]);
  await playAnimation(synchronizedUpright(props));
  props.view.dom.leftMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.se.play(props.sounds.sendMessage);
  props.view.dom.leftMessageWindow.nextMessageIconVisible(false);
  props.view.dom.leftMessageWindow.scrollUp();
  props.view.dom.leftMessageWindow.messages(["礼！！」"]);
  await playAnimation(delay(500));
  await refreshConversation(props);
  playerPilotShoutInInnerHTML(props, "Shinya", yoroshikuOnegaiShimasu());
  enemyPilotShoutInInnerHTML(props, "Tsubasa", yoroshikuOnegaiShimasu());
  await playAnimation(synchronizedBow(props).chain(delay(500)));
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「いい返事だな${wbr} では早速はじめよう`],
    [`試合の基本は${wbr}攻撃側・防御側での${wbr}バッテリーの${wbr}出し合いだ`],
    [`大きいバッテリー${wbr}を出した側の${wbr}行動が成功する${wbr}のだが`],
    [`これは実際に${wbr}やってみた方が${wbr}早いな`],
    [`シンヤ 私が防御に${wbr}回るから${wbr} 好きなように${wbr}攻撃してくれ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    [`それじゃ遠慮なく${wbr}行くッスよ${wbr} ツバサ先輩」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
}
