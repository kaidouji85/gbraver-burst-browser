import { BattleResult } from "gbraver-burst-core";

import { PlayerElements } from "./player-elements";

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
  damage.innerText =
    result.name === "NormalHit" ||
    result.name === "Guard" ||
    result.name === "CriticalHit"
      ? `-${result.damage}`
      : "0";
};
