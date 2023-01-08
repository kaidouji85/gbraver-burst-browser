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
 * @return ストーリーが完了したら発火するPromise
 */
export const noZeroBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「待てシンヤ 0防御はまずい"],
    ["HPが満タンでも 即死するダメージを受けるんだ」"],
  ]);
};

/**
 * ストーリー 0防御なのでコマンドキャンセル
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const cancelZeroBatteryDefense = async (
  props: CustomBattleEventProps
) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「りょ 了解ッス"],
    ["このまま瞬殺されるところだったッス」"],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 0防御0バッテリーなのでバーストする
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const doBurstBecauseZeroBattery = async (
  props: CustomBattleEventProps
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
    ["ツバサ", "「こういう時はバーストで一気にバッテリーを回復させるんだ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    ["バーストすればいいんスね」"],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 0防御0バッテリーなのでパイロットスキルを使う
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const doPilotSkillBecauseZeroBattery = async (
  props: CustomBattleEventProps
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
    ["ならば君に秘められた力 パイロットスキルを発動するんだ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「俺に秘められた力?」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「君のパイロットスキルではバッテリーを少しだけ回復できる"],
    ["それで急場を凌ぐんだ」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「了解ッス"],
    ["俺の根性 見せてやる」"],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー バースト、パイロットスキルが使えず0バッテリーなので負け確定
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const zeroBatteryDefenseBecauseNoBatteryRecover = async (
  props: CustomBattleEventProps
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
    ["ならば君に秘められた力 パイロットスキル"],
    ["……も発動済みか"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「ツバサ先輩 何とかならないッスか」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「すまない これ以上は打つ手がない」"],
  ]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「そんな」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「初心者にはよくあることだ"],
    ["あまり気にするな シンヤ」"],
  ]);
  invisibleAllMessageWindows(props);
};
