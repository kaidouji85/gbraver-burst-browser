import { delay } from "../../../animation/delay";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { enemyPilotShout, playerPilotShout } from "../../pilot-shout";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import { synchronizedBow } from "../../synchronized-bow";
import { synchronizedUpright } from "../../synchronized-upright";
import { waitUntilWindowPush } from "../../wait-until-window-push";

/**
 * 序盤
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function introduction(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [["ツバサ", "「これより摸擬戦を行う"]]);
  props.view.dom.leftMessageWindow.messages(["姿勢を正して"]);
  await synchronizedUpright(props).play();
  props.view.dom.leftMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.sounds.sendMessage.sound.play();
  props.view.dom.leftMessageWindow.nextMessageIconVisible(false);
  props.view.dom.leftMessageWindow.scrollUp();
  props.view.dom.leftMessageWindow.messages(["礼！！」"]);
  await delay(500).play();
  await refreshConversation(props);
  playerPilotShout(props, "Shinya", "よろしくお願いします");
  enemyPilotShout(props, "Tsubasa", "よろしくお願いします");
  await synchronizedBow(props).chain(delay(500)).play();
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「気合い十分だな シンヤ"],
    ["それでは早速だが パイロットスキルについてレクチャーする"],
    ["ロボとパイロットは自由に組み合わせることができるが"],
    ["この相性で勝負が決まると言っても過言ではない"],
    ["……と言われても実感が湧かないと思うので　まずは試合を進めてみよう」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    ["今日も俺が勝つッスよ ツバサ先輩 」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
}
