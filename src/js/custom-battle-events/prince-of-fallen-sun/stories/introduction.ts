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
    [`積もる話も${wbr}あるが`],
    [`パイロット同士 試合で${wbr}語ろうぜ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [["ライト", `「悪いが お断りや」`]]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「つれないな`],
    [`かつて${wbr}同じ${wbr}チームで${wbr}切磋琢磨した${wbr}仲じゃないか」`],
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
    [`試合前に${wbr}手の内を${wbr}明かすなんて${wbr}自殺行為や」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「それでも${wbr}俺は`],
    [
      `宿敵を${wbr}前に${wbr}おめおめと${wbr}逃げ出す${wbr}わけには${wbr}いきません」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「……`],
    [`分かった 好きに${wbr}せえ」`],
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
