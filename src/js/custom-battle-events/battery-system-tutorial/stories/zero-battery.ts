import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 0防御は即死
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function noZeroBatteryDefense(props: CustomBattleEventProps) {
  invisibleAllMessageWindows(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「待て シンヤ!!"],
    ["0防御はまずい たとえHPが満タンでも即死するぞ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー 0防御なのでコマンドキャンセル
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function cancelZeroBatteryDefense(props: CustomBattleEventProps) {
  await noZeroBatteryDefense(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「えっ それはマズイッスね"],
    ["今のは無かったことにして欲しいッス」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
}

/**
 * ストーリー 0防御0バッテリーなのでバーストする
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function doBurstBecauseZeroBattery(props: CustomBattleEventProps) {
  await noZeroBatteryDefense(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーはもう0ッスよ」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「シンヤ こういう時はバーストだ"],
    ["バーストは1試合に1回しか使えないが"],
    ["発動すればバッテリーを大幅に回復できるんだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー 0防御0バッテリーなのでパイロットスキルを使う
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function doPilotSkillBecauseZeroBattery(
  props: CustomBattleEventProps,
) {
  await noZeroBatteryDefense(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーはもう0ッスよ"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「こういう時はバーストでバッテリーを回復するんだ"],
    ["……と言いたいところが もうバーストは使ってしまったか"],
    ["ならば 最後の手段 パイロットスキルを発動するんだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「パイロットスキル?」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「君のパイロットスキルで バッテリーを少しだけ回復できる"],
    ["これで急場を凌ぐんだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー バースト、パイロットスキルが使えず0バッテリーなので負け確定
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function zeroBatteryDefenseBecauseNoBatteryRecover(
  props: CustomBattleEventProps,
) {
  await noZeroBatteryDefense(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーはもう0ッスよ」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「こういう時はバーストでバッテリーを回復するんだ"],
    ["……と言いたいところが もうバーストは使ってしまったか"],
    ["ならば 最後のパイロットスキル"],
    ["……も既に使い果たしたか"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「センパーイ」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [["ツバサ", "「残念ながら万策尽きた」"]]);
  props.view.dom.leftMessageWindow.darken();
}
