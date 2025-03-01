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
 * 導入
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function introduction(
  props: CustomBattleEventProps,
): Promise<void> {
  const playAnimation = createAnimationPlay(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「全国大会の${wbr}覇者${wbr} ユウヤさん`],
    [`その搭乗機${wbr} G（ジェネシス）ブレイバー`],
    [`……俺は${wbr}この人に${wbr}憧れて${wbr} 機動倶楽部を${wbr}始めたんだ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「シンブレイバーか"],
    [
      `……本来${wbr}ブレイバーの${wbr}称号は${wbr} 日本で${wbr}一番強い${wbr}ロボに${wbr}与えられる${wbr}もの`,
    ],
    [`それを${wbr} こんな${wbr}ひよっ子が${wbr}名乗る${wbr}とは`],
    [`面白い${wbr} 気に入ったぜ シンヤ」`],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「間もなく${wbr}都立大田高校・府立洛内高校の`],
    [`練習試合を${wbr}行う`],
  ]);
  props.view.dom.rightMessageWindow.messages(["姿勢を正して"]);
  await playAnimation(synchronizedUpright(props));
  props.view.dom.rightMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.se.play(props.sounds.sendMessage);
  props.view.dom.rightMessageWindow.nextMessageIconVisible(false);
  props.view.dom.rightMessageWindow.scrollUp();
  props.view.dom.rightMessageWindow.messages(["礼！！」"]);
  await playAnimation(delay(500));
  await refreshConversation(props);
  playerPilotShoutInInnerHTML(props, "Shinya", yoroshikuOnegaiShimasu());
  enemyPilotShoutInInnerHTML(props, "Yuuya", yoroshikuOnegaiShimasu());
  await playAnimation(synchronizedBow(props).chain(delay(500)));
  invisibleAllMessageWindows(props);
}
