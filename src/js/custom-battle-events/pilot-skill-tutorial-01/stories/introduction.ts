import { CustomBattleEvent, CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * 序盤
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function introduction(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「これより摸擬戦を行う"],
    ["姿勢を正して 礼!!」"],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages([
    "ツバサ",
    "「よろしくお願いします」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「よろしくお願いします」"]]);
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「気合い十分だな シンヤ"],
    ["それでは早速だが パイロットスキルについてレクチャーする"],
    ["ロボとパイロットは自由に組み合わせることができるが"],
    ["この相性で勝負が決まると言っても過言ではない"],
    ["……と言われても実感が湧かないと思うので"],
    ["まずは試合を進めてみよう」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「了解ッス"]]);
  await scrollRightMessages(props, [["今日も俺が勝ちますよ ツバサ先輩」"]]);
  props.view.dom.rightMessageWindow.darken();
}