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
import { createAnimationPlay } from "../../../td-scenes/battle/play-animation";

/**
 * 序盤
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function introduction(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  const playAnimation = createAnimationPlay(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [["ツバサ", `「これより${wbr}摸擬戦を行う`]]);
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
    ["ツバサ", `「気合い${wbr}十分だな${wbr} シンヤ`],
    [
      `それでは${wbr}早速だが${wbr} パイロットスキルに${wbr}ついて${wbr}レクチャーする`,
    ],
    [
      `ロボと${wbr}パイロットは${wbr}自由に${wbr}組み合わせる${wbr}ことが${wbr}できるが`,
    ],
    [
      `この相性で${wbr}勝負が${wbr}決まると${wbr}言っても${wbr}過言では${wbr}ない`,
    ],
    [`……と言われても${wbr}実感が${wbr}湧かないと${wbr}思うので`],
    [`まずは${wbr}試合を${wbr}進めて${wbr}みよう」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    [`今日も${wbr}俺が${wbr}勝つッスよ${wbr} ツバサ先輩 」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
}
