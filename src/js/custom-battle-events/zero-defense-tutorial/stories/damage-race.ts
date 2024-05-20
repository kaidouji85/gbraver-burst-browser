import { wbr } from "../../../dom/wbr";
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
    ["ガイ", `「ダメージレースは${wbr}イーブンか`],
    [`面白い${wbr} そう${wbr}こなくてはな」`],
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
    [
      "ガイ",
      `「何？${wbr} 俺が${wbr}ダメージレースで${wbr}負けて${wbr}いるだと`,
    ],
    [`少しは${wbr}本気を${wbr}出さんとな」`],
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
    ["ガイ", `「フハハハハ${wbr} 見ろ${wbr}シンヤ！！`],
    [`ダメージレースは${wbr}俺の${wbr}優勢`],
    [`このまま${wbr}勝利を${wbr}いただくぞ」`],
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
