import {
  BattleResult,
  CriticalHit,
  Guard,
  NormalHit,
} from "gbraver-burst-core";

import { PlayerElements } from "./player-elements";

/**
 * ヒットした時のダメージを更新する
 * @param damage ダメージのHTML要素
 * @param result 戦闘結果
 */
const normalHit = (damage: HTMLElement, result: NormalHit) => {
  damage.innerText = `ヒット -${result.damage}`;
};

/**
 * ガードした時のダメージを更新する
 * @param damage ダメージのHTML要素
 * @param result 戦闘結果
 */
const guard = (damage: HTMLElement, result: Guard) => {
  damage.innerText = `ガード -${result.damage}`;
};

/**
 * クリティカルヒットした時のダメージを更新する
 * @param damage ダメージのHTML要素
 * @param result 戦闘結果
 */
const criticalHit = (damage: HTMLElement, result: CriticalHit) => {
  damage.innerText = `クリティカル -${result.damage}`;
};

/**
 * ミスした時のダメージを更新する
 * @param damage ダメージのHTML要素
 * @param result 戦闘結果
 */
const miss = (damage: HTMLElement) => {
  damage.innerText = `ミス`;
};

/**
 * フェイントした時のダメージを更新する
 * @param damage ダメージのHTML要素
 * @param result 戦闘結果
 */
const feint = (damage: HTMLElement) => {
  damage.innerText = `フェイント`;
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
  if (result.name === "NormalHit") {
    normalHit(damage, result);
  } else if (result.name === "Guard") {
    guard(damage, result);
  } else if (result.name === "CriticalHit") {
    criticalHit(damage, result);
  } else if (result.name === "Miss") {
    miss(damage);
  } else if (result.name === "Feint") {
    feint(damage);
  }
};
