import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「待て${wbr} シンヤ!!`],
    [`0防御はまずい${wbr} たとえHPが${wbr}満タンでも${wbr}即死するぞ」`],
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
    ["シンヤ", `「えっ${wbr} それはマズイッスね`],
    [`今のは${wbr}無かったことに${wbr}して欲しいッス」`],
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
    ["シンヤ", `「でもツバサ先輩${wbr} 俺のバッテリーは${wbr}もう0ッスよ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「シンヤ${wbr} こういう時は${wbr}バーストだ`],
    [`バーストは${wbr}1試合に1回しか${wbr}使えないが`],
    [`発動すれば${wbr}バッテリーを${wbr}大幅に${wbr}回復できるんだ」`],
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
    ["シンヤ", `「でもツバサ先輩${wbr} 俺のバッテリーは${wbr}もう0ッスよ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      `「こういう時は${wbr}バーストで${wbr}バッテリーを${wbr}回復${wbr}するんだ`,
    ],
    [
      `……と${wbr}言いたい${wbr}ところだが${wbr} もう${wbr}バーストは${wbr}使って${wbr}しまったか`,
    ],
    [
      `ならば${wbr}最後の手段${wbr} パイロットスキルを${wbr}発動${wbr}するんだ」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「パイロットスキル?」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      `「君の${wbr}パイロットスキルで${wbr} バッテリーを${wbr}少しだけ${wbr}回復${wbr}できる`,
    ],
    [`これで${wbr}急場を${wbr}凌ぐんだ」`],
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
    ["シンヤ", `「でもツバサ先輩${wbr} 俺のバッテリーは${wbr}もう0ッスよ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      `「こういう時は${wbr}バーストで${wbr}バッテリーを${wbr}回復${wbr}するんだ`,
    ],
    [
      `……と${wbr}言いたいところだが${wbr} もうバーストは${wbr}使って${wbr}しまったか`,
    ],
    [`ならば${wbr} 最後手段の${wbr}パイロットスキル`],
    [`……も${wbr}既に${wbr}使い${wbr}果たしたか`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「センパーイ」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「残念ながら${wbr}万策${wbr}尽きた」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
