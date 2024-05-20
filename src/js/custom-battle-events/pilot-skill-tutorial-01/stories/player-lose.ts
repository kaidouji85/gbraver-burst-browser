import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * プレイヤー敗北ストーリー
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function playerLose(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「あと少しで${wbr}勝てそう${wbr}だったのに」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「残念だが${wbr}君と${wbr}シンブレイバーの${wbr}組み合わせ${wbr}では`],
    [`絶対に${wbr}私を${wbr}倒すことが${wbr}できない」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「そうなんスか」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「君が${wbr}すべての${wbr}バッテリーを${wbr}防御に${wbr}回したと${wbr}しても`],
    [`私の${wbr}攻撃に${wbr}耐える${wbr}ことは${wbr}できない」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「なら${wbr} 攻撃に${wbr}バッテリーを${wbr}集中させたら${wbr}どうッスか」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「良い発想だが${wbr} それも${wbr}難しいな`],
    [`君が${wbr}後攻${wbr}なので${wbr} 私を${wbr}一撃で${wbr}倒せなければ${wbr}負けが${wbr}確定するが`],
    [`シンブレイバーの${wbr}5攻撃で${wbr} ウィングドーザを${wbr}即死${wbr}させることは${wbr}できないんだ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「そんな！！"],
    [`ツバサ先輩${wbr} もう${wbr}詰みッスか」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「案ずるな${wbr} そのための${wbr}パイロットスキルだ」`],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「ガイ君${wbr} そこに${wbr}居るんだろう」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [["ガイ", "「……！！」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「すまないが${wbr} 我々の${wbr}練習に${wbr}協力${wbr}してくれないか」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
