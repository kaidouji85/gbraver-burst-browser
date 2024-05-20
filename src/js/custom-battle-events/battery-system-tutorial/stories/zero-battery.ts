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
    ["ツバサ", "「待て<wbr> シンヤ!!"],
    ["0防御はまずい<wbr> たとえHPが<wbr>満タンでも<wbr>即死するぞ」"],
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
    ["シンヤ", "「えっ<wbr> それはマズイッスね"],
    ["今のは<wbr>無かったことに<wbr>して欲しいッス」"],
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
    ["シンヤ", "「でもツバサ先輩<wbr> 俺のバッテリーは<wbr>もう0ッスよ」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「シンヤ<wbr> こういう時は<wbr>バーストだ"],
    ["バーストは<wbr>1試合に1回しか<wbr>使えないが"],
    ["発動すれば<wbr>バッテリーを<wbr>大幅に回復できるんだ」"],
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
    ["シンヤ", "「でもツバサ先輩<wbr> 俺のバッテリーは<wbr>もう0ッスよ"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「こういう時はバーストで<wbr>バッテリーを<wbr>回復するんだ"],
    ["……と言いたいところが<wbr> もうバーストは<wbr>使ってしまったか"],
    ["ならば最後の手段<wbr> パイロットスキルを<wbr>発動するんだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「パイロットスキル?」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      "「君のパイロットスキルで<wbr> バッテリーを<wbr>少しだけ<wbr>回復できる",
    ],
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
    ["シンヤ", "「でもツバサ先輩<wbr> 俺のバッテリーは<wbr>もう0ッスよ」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      "「こういう時は<wbr>バーストで<wbr>バッテリーを<wbr>回復するんだ",
    ],
    ["……と言いたいところが<wbr> もうバーストは<wbr>使ってしまったか"],
    ["ならば<wbr> 最後手段のパイロットスキル"],
    ["……も既に<wbr>使い果たしたか"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「センパーイ」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「残念ながら<wbr>万策尽きた」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
