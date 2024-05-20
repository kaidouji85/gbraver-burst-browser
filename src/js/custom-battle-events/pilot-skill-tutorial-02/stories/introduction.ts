import { delay } from "../../../animation/delay";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
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
 * イントロダクション
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function introduction(props: Readonly<CustomBattleEventProps>) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    [
      "シンヤ",
      `「ガイ${wbr} 練習を${wbr}手伝って${wbr}くれて ありがとう${wbr}ッス」`,
    ],
  ]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", `「勘違い${wbr}するなよ${wbr} シンヤ`],
    [
      `俺は${wbr}シンブレイバーと${wbr}ウィングドーザの${wbr}情報が${wbr}欲しい${wbr}だけだ」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「それでは${wbr}ガイ君${wbr} 練習を${wbr}はじめようか`],
    [`私は${wbr}先程と${wbr}全く同じ${wbr}戦術で${wbr}戦うが`],
    [
      `君の${wbr}スキルなら${wbr}勝利を${wbr}掴む${wbr}ことが${wbr}できるだろう」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
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
  playerPilotShoutInInnerHTML(props, "Gai", yoroshikuOnegaiShimasu());
  enemyPilotShoutInInnerHTML(props, "Tsubasa", yoroshikuOnegaiShimasu());
  await synchronizedBow(props).chain(delay(500)).play();
}
