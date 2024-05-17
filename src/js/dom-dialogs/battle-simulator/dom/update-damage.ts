import { BattleResult } from "gbraver-burst-core";

import { PlayerElements } from "./player-elements";

/**
 * ダメージあり
 * @param damage ダメージHTML要素 
 * @param value ダメージ値
 */
const hasDamage = (damage: HTMLElement, value: number) => {
  damage.innerText = `-${value}`;
};

/**
 * ダメージなし
 * @param damage ダメージHTML要素 
 */
const noDamage = (damage: HTMLElement) => {
  damage.innerText = "0";
};

/**
 * ダメージを更新する
 * @param elements プレイヤー関連のHTML要素
 * @param result 戦闘結果
 */
export const updateDamage = (
  elements: PlayerElements,
  result: BattleResult,
) => {
  const { damage } = elements;
  if (
    result.name === "NormalHit" ||
    result.name === "Guard" ||
    result.name === "CriticalHit"
  ) {
    hasDamage(damage, result.damage);
  } else {
    noDamage(damage);
  }
};
