import { delay } from "../../../animation/delay";
import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
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
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const introduction = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    [
      "ライト",
      `「さすがは${wbr}大田高校${wbr} 一瞬で${wbr}勝負が${wbr}ついて${wbr}しもたな`,
    ],
    [
      `どや${wbr} まだ道路の${wbr}占有時間も${wbr}残っとるし${wbr} ワイと${wbr}もう一戦${wbr}やりまへんか」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [["ツバサ", `「少し${wbr}待ってくれ」`]]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「監督からも${wbr}Goサインが${wbr}出た`],
    [`シンヤ${wbr} 悪いが${wbr}もう一戦だけ${wbr}頑張って${wbr}くれ」`],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「了解ッス」"]]);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Gai");
  props.view.dom.leftMessageWindow.messages(["ガイ", "「双方 姿勢を正して"]);
  await synchronizedUpright(props).play();
  props.view.dom.leftMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.se.play(props.sounds.sendMessage);
  props.view.dom.leftMessageWindow.nextMessageIconVisible(false);
  props.view.dom.leftMessageWindow.scrollUp();
  props.view.dom.leftMessageWindow.messages(["礼！！」"]);
  await delay(500).play();
  await refreshConversation(props);
  playerPilotShoutInInnerHTML(props, "Shinya", yoroshikuOnegaiShimasu());
  enemyPilotShoutInInnerHTML(props, "Raito", yoroshikuOnegaiShimasu());
  await synchronizedBow(props).chain(delay(500)).play();
  invisibleAllMessageWindows(props);
};
