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
    ["ユウヤ", `「久しぶり${wbr}だな${wbr}ライト`],
    [`積もる話も${wbr}あるだろうが`],
    [`ここは${wbr}パイロット同士 試合で${wbr}語ろうじゃ${wbr}ないか」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「悪いが${wbr}お断りや`],
    [
      `本番前に${wbr}ワイの${wbr}手の内を${wbr}見して${wbr}たまる${wbr}かいな」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「つれないな`],
    [
      `かつては${wbr}同じチームで${wbr}切磋琢磨${wbr}してきた仲${wbr}じゃないか」`,
    ],
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
    [
      `ユウヤの${wbr}強さの${wbr}根源は 相手の${wbr}戦術を${wbr}読み切る${wbr}力`,
    ],
    [
      `せやさかい${wbr}大会前に${wbr}手の内を${wbr}明かすなんて${wbr}自殺行為や」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    [
      "ガイ",
      `「それでも${wbr}俺は${wbr}逃げる訳には${wbr}いかないん${wbr}です`,
    ],
    [`巨大ロボ${wbr}創業家の${wbr}人間として」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「……わかった`],
    [`監督には${wbr}ワイから${wbr}話を${wbr}つける`],
    [`ガイ 存分に${wbr}暴れて${wbr}来いや」`],
  ]);

  props.view.dom.rightMessageWindow.darken();

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
