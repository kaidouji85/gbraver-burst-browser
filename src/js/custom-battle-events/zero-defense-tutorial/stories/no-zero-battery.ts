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
    ["ツバサ", "「待てシンヤ 0防御はまずい"],
    ["HPが満タンでも 即死するぞ」"],
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
    ["危うく瞬殺されるところだったッス」"],
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
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーはもう0ッスよ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「こういう時はバーストだ"],
    ["バーストは1試合に1回しか使えないが"],
    ["発動すればバッテリーを大幅に回復できるんだ」"],
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
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーはもう0ッスよ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「こういう時はバーストで一気にバッテリーを回復させるんだ"],
    ["……と言いたい所だが バーストは使用済みか"],
    ["ならばパイロットスキルを発動するんだ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「パイロットスキル?」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「君のパイロットスキルでは バッテリーを少しだけ回復できる"],
    ["それで急場を凌ぐんだ」"],
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
    ["シンヤ", "「でもツバサ先輩 俺のバッテリーはもう0ッスよ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「こういう時はバーストで一気にバッテリーを回復させるんだ"],
    ["……と言いたい所だが、バーストは使用済みか"],
    ["ならばパイロットスキル"],
    ["……も発動済みか"],
    ["すまない これ以上は打つ手がない」"],
  ]);
  invisibleAllMessageWindows(props);
};
