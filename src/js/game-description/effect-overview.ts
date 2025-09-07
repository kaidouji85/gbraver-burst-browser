import {
  ArmdozerEffect,
  BatteryCorrection,
  CorrectPower,
  EffectPeriod,
  TryReflect,
  TurnStartBatteryCorrect,
} from "gbraver-burst-core";

/**
 * エフェクト有効期間の概要を取得する
 * @param period エフェクト有効期間
 * @returns エフェクト有効期間の概要
 */
export const getEffectPeriodOverview = (period: EffectPeriod) => {
  return period.type === "TurnLimit"
    ? `（残り${period.remainingTurn}ターン）`
    : "";
};

/**
 * 攻撃補正の概要を取得する
 * @param effect 攻撃補正エフェクト
 * @returns 攻撃補正の概要
 */
export const getCorrectPowerOverview = (effect: CorrectPower) => {
  const sign = 0 < effect.power ? "+" : "-";
  return `攻撃${sign}${effect.power}`;
};

/**
 * 攻撃補正半減の概要を取得する
 * @returns 攻撃補正半減の概要
 */
export const getHalveCorrectPowerOverView = () => {
  return `攻撃アップ半減`;
};

/**
 * カウンターの概要を取得する
 * @param effect カウンターのエフェクト
 * @returns カウンターの概要
 */
export const getTryReflectOverview = (effect: TryReflect) => {
  return `カウンター${effect.damage}`;
};

/**
 * 2回行動の概要を取得する
 * @returns 2回行動の概要
 */
export const getContinuousActivePlayerOverview = () => {
  return `2回行動`;
};

/**
 * バッテリー補正の概要を取得する
 * @param effect バッテリー補正のエフェクト
 * @returns バッテリー補正の概要
 */
export const getBatteryCorrectionOverview = (effect: BatteryCorrection) => {
  const sign = 0 < effect.batteryCorrection ? "+" : "-";
  return `バッテリー${sign}${effect.batteryCorrection}`;
};

/**
 * ダメージ半減の概要を取得する
 * @returns ダメージ半減の概要
 */
export const getDamageHalvedOverview = () => {
  return `被ダメージ半減`;
};

/**
 * ターン開始時のバッテリー回復スキップの概要を取得する
 * @returns ターン開始時のバッテリー回復スキップの概要
 */
export const getBatteryRecoverSkipOverview = () => {
  return `バッテリー回復スキップ（自分ターン開始時）`;
};

/**
 * ターン開始時バッテリー回復量補正の概要を取得する
 * @param effect ターン開始時バッテリー回復量補正のエフェクト
 * @returns ターン開始時バッテリー回復量補正の概要
 */
export const getTurnStartBatteryCorrectOverview = (
  effect: TurnStartBatteryCorrect,
) => {
  return `バッテリー${effect.correctBattery}回復（自分ターン開始時）`;
};

/**
 * アームドーザエフェクトの概要を取得する
 * @param effect アームドーザエフェクト
 * @returns アームドーザエフェクトの概要、概要が存在しない場合はnull
 */
export function getEffectOverView(effect: ArmdozerEffect): string | null {
  switch (effect.type) {
    case "CorrectPower":
      return getCorrectPowerOverview(effect);
    case "HalveCorrectPower":
      return getHalveCorrectPowerOverView();
    case "TryReflect":
      return getTryReflectOverview(effect);
    case "ContinuousActivePlayer":
      return getContinuousActivePlayerOverview();
    case "BatteryCorrection":
      return getBatteryCorrectionOverview(effect);
    case "DamageHalved":
      return getDamageHalvedOverview();
    case "BatteryRecoverSkip":
      return getBatteryRecoverSkipOverview();
    case "TurnStartBatteryCorrect":
      return getTurnStartBatteryCorrectOverview(effect);
    default:
      return null;
  }
}
