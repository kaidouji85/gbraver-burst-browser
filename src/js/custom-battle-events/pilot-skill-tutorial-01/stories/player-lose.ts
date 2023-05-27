import {CustomBattleEventProps} from "../../../td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../../active-message-window";
import {scrollLeftMessages, scrollRightMessages} from "../../scroll-messages";
import {refreshConversation} from "../../invisible-all-message-windows";

/**
 * プレイヤー敗北ストーリー
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function playerLose(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「あと少しで勝てそうだったスのに」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「残念だがシンヤ"],
    ["君とシンブレイバー組み合わせでは 絶対に私を倒すことができない」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「そうなんスか ワンチャンないんスか」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「今の君では 私の攻撃に2回耐えることはできない"],
    ["かつ 私が先行なので 2ターン目に私を倒せないと負けが確定する」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「でもツバサ先輩"],
    ["シンブレイバーの攻撃力だとウィングドーザを一撃で倒せないッスよ"],
    ["もう詰みッスか」"]
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「案ずるなシンヤ"],
    ["シンブレイバーの攻撃力を底上げすれば勝機はある"],
    ["そのためのパイロットスキルだ"],
    ["ガイ君 そこに居るんだろう」"]
  ]);
  props.view.dom.leftMessageWindow.darken();
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「……！！」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「すまないが 我々の練習に協力してくれないか」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}