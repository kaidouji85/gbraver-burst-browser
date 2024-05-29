import { BattleResult } from "gbraver-burst-core";

import { BATTLE_RESULT_NAME, BATTLE_RESULT_NAME_IS_DEATH } from "./class-name";
import { PlayerElements } from "./player-elements";

/** 戦闘結果名のマッピング */
const battleResultNames = {
  NormalHit: "ヒット",
  Guard: "ガード",
  CriticalHit: "クリティカル",
  Feint: "フェイント",
  Miss: "ミス",
};

/** 更新パラメータ */
type BattleResultNameUpdaterParams = {
  /** プレイヤーのHTML要素 */
  elements: PlayerElements;
  /** 戦闘結果名 */
  result: BattleResult;
  /** 死亡したか否か、trueで死亡 */
  isDeath: boolean;
};

/**
 * 戦闘結果名を更新する
 * @param params パラメータ
 */
export const updateBattleResultName = (
  params: BattleResultNameUpdaterParams,
) => {
  const { elements, result, isDeath } = params;
  const { battleResultName } = elements;
  battleResultName.innerText = battleResultNames[result.name] ?? "";
  battleResultName.className = isDeath
    ? BATTLE_RESULT_NAME_IS_DEATH
    : BATTLE_RESULT_NAME;
};
