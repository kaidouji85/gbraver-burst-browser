import { ArmdozerEffect, CorrectPower, EffectPeriod } from "gbraver-burst-core";

/**
 * エフェクト有効期間の概要を取得する
 * @param period エフェクト有効期間
 * @returns エフェクト有効期間の概要
 */
export const getEffectPeriodOverview = (period: EffectPeriod) => {
  return period.type === "TurnLimit"
    ? `(残り${period.remainingTurn}ターン)`
    : "";
};

/**
 * 攻撃補正の概要を取得する
 * @param effect 攻撃補正エフェクト
 * @returns 攻撃補正の概要
 */
export const getCorrectPowerOverview = (effect: CorrectPower) => {
  const sign = 0 < effect.power ? "+" : "-";
  const period = getEffectPeriodOverview(effect.period);
  return `攻撃${sign}${effect.power}${period}`;
};

/**
 * アームドーザエフェクトの概要を取得する
 * @param effect アームドーザエフェクト
 * @returns アームドーザエフェクトの概要
 */
export function getEffectOverView(effect: ArmdozerEffect): string {
  switch (effect.type) {
    case "CorrectPower":
      return getCorrectPowerOverview(effect);
    default:
      return "";
  }
}
