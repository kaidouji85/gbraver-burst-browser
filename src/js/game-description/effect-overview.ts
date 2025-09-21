import {
  ArmdozerEffect,
  BatteryCorrection,
  CorrectPower,
  DamageHalved,
  EffectPeriod,
  HalveCorrectPower,
  TryReflect,
  TurnStartBatteryCorrect,
} from "gbraver-burst-core";

/** エフェクト概要 */
type EffectOverView = {
  /** エフェクトの概要 */
  effect: string;
  /** エフェクトの注釈（有効期間、適用タイミングなど） */
  annotation: string;
};

/**
 * エフェクト有効期間の概要を取得する
 * @param period エフェクト有効期間
 * @returns エフェクト有効期間の概要
 */
const getEffectPeriodOverview = (period: EffectPeriod) => {
  return period.type === "TurnLimit"
    ? `（残り${period.remainingTurn}ターン）`
    : "";
};

/**
 * 攻撃補正の概要を取得する
 * @param effect 攻撃補正エフェクト
 * @returns 攻撃補正の概要
 */
export const getCorrectPowerOverview = (
  effect: CorrectPower,
): EffectOverView => {
  const sign = 0 < effect.power ? "+" : "-";
  return {
    effect: `攻撃${sign}${effect.power}`,
    annotation: getEffectPeriodOverview(effect.period),
  };
};

/**
 * 攻撃補正半減の概要を取得する
 * @returns 攻撃補正半減の概要
 */
export const getHalveCorrectPowerOverView = (
  effect: HalveCorrectPower,
): EffectOverView => {
  return {
    effect: `攻撃アップ半減`,
    annotation: getEffectPeriodOverview(effect.period),
  };
};

/**
 * カウンターの概要を取得する
 * @param effect カウンターのエフェクト
 * @returns カウンターの概要
 */
export const getTryReflectOverview = (effect: TryReflect): EffectOverView => {
  return {
    effect: `カウンター${effect.damage}`,
    annotation: getEffectPeriodOverview(effect.period),
  };
};

/**
 * 2回行動の概要を取得する
 * @returns 2回行動の概要
 */
export const getContinuousActivePlayerOverview = (): EffectOverView => {
  return {
    effect: `2回行動`,
    annotation: "",
  };
};

/**
 * バッテリー補正の概要を取得する
 * @param effect バッテリー補正のエフェクト
 * @returns バッテリー補正の概要
 */
export const getBatteryCorrectionOverview = (
  effect: BatteryCorrection,
): EffectOverView => {
  const sign = 0 < effect.batteryCorrection ? "+" : "-";
  return {
    effect: `バッテリー${sign}${effect.batteryCorrection}`,
    annotation: getEffectPeriodOverview(effect.period),
  };
};

/**
 * ダメージ半減の概要を取得する
 * @returns ダメージ半減の概要
 */
export const getDamageHalvedOverview = (
  effect: DamageHalved,
): EffectOverView => {
  return {
    effect: `被ダメージ半減`,
    annotation: getEffectPeriodOverview(effect.period),
  };
};

/**
 * ターン開始時のバッテリー回復スキップの概要を取得する
 * @returns ターン開始時のバッテリー回復スキップの概要
 */
export const getBatteryRecoverSkipOverview = (): EffectOverView => {
  return {
    effect: `バッテリー回復スキップ`,
    annotation: `（自分ターン開始時）`,
  };
};

/**
 * ターン開始時バッテリー回復量補正の概要を取得する
 * @param effect ターン開始時バッテリー回復量補正のエフェクト
 * @returns ターン開始時バッテリー回復量補正の概要
 */
export const getTurnStartBatteryCorrectOverview = (
  effect: TurnStartBatteryCorrect,
): EffectOverView => {
  return {
    effect: `バッテリー${effect.correctBattery}回復`,
    annotation: `（自分ターン開始時）`,
  };
};

/**
 * アームドーザエフェクトの概要を取得する
 * @param effect アームドーザエフェクト
 * @returns アームドーザエフェクトの概要、概要が存在しない場合はnull
 */
export function getEffectOverView(
  effect: ArmdozerEffect,
): EffectOverView | null {
  switch (effect.type) {
    case "CorrectPower":
      return getCorrectPowerOverview(effect);
    case "HalveCorrectPower":
      return getHalveCorrectPowerOverView(effect);
    case "TryReflect":
      return getTryReflectOverview(effect);
    case "ContinuousActivePlayer":
      return getContinuousActivePlayerOverview();
    case "BatteryCorrection":
      return getBatteryCorrectionOverview(effect);
    case "DamageHalved":
      return getDamageHalvedOverview(effect);
    case "BatteryRecoverSkip":
      return getBatteryRecoverSkipOverview();
    case "TurnStartBatteryCorrect":
      return getTurnStartBatteryCorrectOverview(effect);
    default:
      return null;
  }
}
