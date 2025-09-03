import {
  ArmdozerEffect,
  ContinuousActivePlayer,
  CorrectPower,
  EffectPeriod,
  HalveCorrectPower,
  TryReflect,
} from "gbraver-burst-core";

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
 * 攻撃補正半減の概要を取得する
 * @param effect 攻撃補正半減エフェクト
 * @returns 攻撃補正半減の概要
 */
export const getHalveCorrectPowerOverView = (effect: HalveCorrectPower) => {
  const period = getEffectPeriodOverview(effect.period);
  return `攻撃補正の効果半減${period}`;
};

/**
 * カウンターの概要を取得する
 * @param effect カウンターのエフェクト
 * @returns カウンターの概要
 */
export const getTryReflectOverview = (effect: TryReflect) => {
  const period = getEffectPeriodOverview(effect.period);
  return `カウンター${effect.damage}${period}`;
};

/**
 * 2回行動の概要を取得する
 * @param effect 2回行動のエフェクト
 * @returns 2回行動の概要
 */
export const getContinuousActivePlayerOverview = (
  effect: ContinuousActivePlayer,
) => {
  const period = getEffectPeriodOverview(effect.period);
  return `2回行動${period}`;
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
    case "HalveCorrectPower":
      return getHalveCorrectPowerOverView(effect);
    case "TryReflect":
      return getTryReflectOverview(effect);
    case "ContinuousActivePlayer":
      return getContinuousActivePlayerOverview(effect);
    default:
      return "";
  }
}
