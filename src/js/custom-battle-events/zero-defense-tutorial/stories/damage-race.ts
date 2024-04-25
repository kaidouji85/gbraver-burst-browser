import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー ダメージレースイーブン
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
const damageRaceEven = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「ダメージレースはイーブンか"],
    ["面白い そうこなくてはな」"],
  ]);
  await refreshConversation(props);
};

/**
 * ストーリー ダメージレース有利
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
const damageRaceAdvantage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「何？ 俺がダメージレースで負けているだと"],
    ["少しは本気を出さんとな」"],
  ]);
  await refreshConversation(props);
};

/**
 * ストーリー ダメージレース不利
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
const damageRaceDisadvantage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「フハハハハ 見ろシンヤ！！"],
    ["ダメージレースは俺の優勢"],
    ["このまま勝利をいただくぞ」"],
  ]);
  await refreshConversation(props);
};

/**
 * ストーリー ダメージレース
 * @param props イベントプロパティ
 * @param playerHP プレイヤーHP
 * @param enemyHP 敵HP
 * @returns ストーリーが完了したら発火するPromise
 */
export const damageRace = async (
  props: CustomBattleEventProps,
  playerHP: number,
  enemyHP: number,
) => {
  const hpDiff = playerHP - enemyHP;
  const isHpNearlyEqual = Math.abs(hpDiff) <= 500;

  if (isHpNearlyEqual) {
    await damageRaceEven(props);
  } else if (0 < hpDiff) {
    await damageRaceAdvantage(props);
  } else if (hpDiff < 0) {
    await damageRaceDisadvantage(props);
  }
};
