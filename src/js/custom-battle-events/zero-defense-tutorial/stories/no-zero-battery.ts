import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 0防御禁止
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const noZeroBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「待て${wbr}シンヤ${wbr} 0防御は${wbr}まずい`],
    [`HPが${wbr}満タンでも${wbr} 即死${wbr}するぞ」`],
  ]);
};

/**
 * ストーリー 0防御なのでコマンドキャンセル
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const cancelZeroBatteryDefense = async (
  props: CustomBattleEventProps,
) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    [`危うく${wbr}瞬殺される${wbr}ところ${wbr}だったッス」`],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 0防御0バッテリーなのでバーストする
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const doBurstBecauseZeroBattery = async (
  props: CustomBattleEventProps,
) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    [
      "シンヤ",
      `「でも${wbr}ツバサ先輩${wbr} 俺の${wbr}バッテリーは${wbr}もう${wbr}0ッスよ」`,
    ],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「こういう時は${wbr}バーストだ`],
    [`バーストは${wbr}1試合に${wbr}1回しか${wbr}使えないが`],
    [`発動すれば${wbr}バッテリーを${wbr}大幅に${wbr}回復${wbr}できるんだ」`],
  ]);
  await refreshConversation(props, 100);
};

/**
 * ストーリー 0防御0バッテリーなのでパイロットスキルを使う
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const doPilotSkillBecauseZeroBattery = async (
  props: CustomBattleEventProps,
) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    [
      "シンヤ",
      `「でも${wbr}ツバサ先輩${wbr} 俺の${wbr}バッテリーは${wbr}もう${wbr}0ッスよ」`,
    ],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    [
      "ツバサ",
      `「こういう時は${wbr}バーストで${wbr}一気に${wbr}バッテリーを${wbr}回復${wbr}させるんだ`,
    ],
    [`……と言いたい${wbr}所だが${wbr} バーストは${wbr}使用済みか`],
    [`ならば${wbr}パイロットスキルを${wbr}発動${wbr}するんだ」`],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「パイロットスキル?」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    [
      "ツバサ",
      `「君の${wbr}パイロットスキルでは${wbr} バッテリーを${wbr}少しだけ${wbr}回復できる`,
    ],
    [`それで${wbr}急場を${wbr}凌ぐんだ」`],
  ]);
  await refreshConversation(props, 100);
};

/**
 * ストーリー バースト、パイロットスキルが使えず0バッテリーなので負け確定
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const zeroBatteryDefenseBecauseNoBatteryRecover = async (
  props: CustomBattleEventProps,
) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    [
      "シンヤ",
      `「でも${wbr}ツバサ先輩${wbr} 俺の${wbr}バッテリーは${wbr}もう${wbr}0ッスよ」`,
    ],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    [
      "ツバサ",
      `「こういう時は${wbr}バーストで${wbr}一気に${wbr}バッテリーを${wbr}回復${wbr}させるんだ`,
    ],
    [`……と言いたい${wbr}所だが${wbr} バーストは${wbr}使用済みか`],
    [`ならば${wbr}パイロットスキル`],
    [`……も${wbr}発動済みか`],
    [`すまない${wbr} これ以上は${wbr}打つ手がない」`],
  ]);
  invisibleAllMessageWindows(props);
};
