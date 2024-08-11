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
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「久しぶりだなライト`],
    [`積もる話もあるだろうが`],
    [`ここはパイロット同士 試合で語ろうじゃないか」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「悪いがお断りや`],
    [`本番前にワイの手の内を見してたまるかいな」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「つれないな`],
    [`かつては同じチームで切磋琢磨してきた仲じゃないか」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「ライト先輩`],
    [`ここは${wbr}俺に${wbr}やらせて${wbr}ください」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「ダメや！！`],
    [`ユウヤの強さの根源は 相手の戦術を読み切る力や`],
    [`たとえ勝ったとしても`],
    [`大会前に手の内を明かすなんて自殺行為や」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「それでも俺は逃げる訳にはいかないんです`],
    [`巨大ロボ創業家の人間として」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「……あんたん覚悟はわかった`],
    [`ガイ 存分に暴れて来いや」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props);

  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Raito");
  props.view.dom.rightMessageWindow.messages(["ライト", "「姿勢を正して"]);
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
  enemyPilotShoutInInnerHTML(props, "Gai", yoroshikuOnegaiShimasu());
  await synchronizedBow(props).chain(delay(500)).play();
  invisibleAllMessageWindows(props);
}
