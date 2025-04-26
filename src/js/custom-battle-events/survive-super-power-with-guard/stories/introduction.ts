import { delay } from "../../../animation/delay";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { createAnimationPlay } from "../../../td-scenes/battle/play-animation";
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
  const playAnimation = createAnimationPlay(props);

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「ありがとう${wbr}ライト`],
    [`チーム統合の${wbr}件を${wbr}了承${wbr}してくれて」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「わいらは${wbr}クラブチームや`],
    [`オーナーさえ${wbr}了承すれば${wbr}何ら問題あらへん`],
    [
      `打倒${wbr}Gブレイバーの${wbr}ためには 足の引っ張り合いを${wbr}しとる${wbr}場合や${wbr}ないからな」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「あとは${wbr}誰が${wbr}部長に${wbr}なるかだが……」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「愚問やな`],
    [`そんなん一${wbr}番強い奴に${wbr}決まっとる${wbr}やないか」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「そう来ると${wbr}思った`],
    [`シンヤ サポートは${wbr}君に任せたぞ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", `「了解ッス ツバサ先輩」`]]);
  props.view.dom.rightMessageWindow.darken();

  await refreshConversation(props);

  activeRightMessageWindowWithFace(props, "Gai");
  props.view.dom.rightMessageWindow.messages(["ガイ", "「姿勢を正して"]);
  await playAnimation(synchronizedUpright(props));
  props.view.dom.rightMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.se.play(props.sounds.sendMessage);
  props.view.dom.rightMessageWindow.nextMessageIconVisible(false);
  props.view.dom.rightMessageWindow.scrollUp();
  props.view.dom.rightMessageWindow.messages(["礼！！」"]);
  await playAnimation(delay(500));

  await refreshConversation(props);
  playerPilotShoutInInnerHTML(props, "Tsubasa", yoroshikuOnegaiShimasu());
  enemyPilotShoutInInnerHTML(props, "Raito", yoroshikuOnegaiShimasu());
  await playAnimation(synchronizedBow(props).chain(delay(500)));
  invisibleAllMessageWindows(props);
}
