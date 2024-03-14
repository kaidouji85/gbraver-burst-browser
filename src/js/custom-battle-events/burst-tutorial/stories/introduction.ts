import { delay } from "../../../animation/delay";
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
 * @return ストーリーが完了したら発火するPromise
 */
export const introduction = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", "「さすがは大田高校 一瞬で勝負がついてしもたな"],
    ["どや まだ道路の占有時間も残っとるし ワイともう一戦やりまへんか」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [["ツバサ", "「少し待ってくれ」"]]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「監督からもGoサインが出た"],
    ["シンヤ 悪いがもう一戦だけ頑張ってくれ」"],
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
  props.sounds.sendMessage.sound.play();
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
