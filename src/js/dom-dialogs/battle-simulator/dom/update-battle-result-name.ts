import { BattleResult } from "gbraver-burst-core";

import { PlayerElements } from "./player-elements";

/** 戦闘結果名のマッピング */
const battleResultNames: { [key: string]: string } = {
  NormalHit: "ヒット",
  Guard: "ガード",
  CriticalHit: "クリティカル",
  Feint: "フェイント",
  Miss: "ミス",
};

/**
 * 戦闘結果名を更新する
 * @param elements プレイヤーのHTML要素
 * @param result 戦闘結果
 */
export const updateBattleResultName = (
  elements: PlayerElements,
  result: BattleResult,
) => {
  const { battleResultName } = elements;
  battleResultName.innerText = battleResultNames[result.name] ?? "";
};
