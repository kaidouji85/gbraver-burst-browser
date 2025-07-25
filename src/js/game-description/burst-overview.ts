import type {
  BatteryLimitBreak,
  BuffPower,
  Burst,
  ContinuousAttack,
  EffectClear,
  ForceTurnEnd,
  Ineffective,
  LightningBarrier,
  RecoverBattery,
} from "gbraver-burst-core";

/**
 * バッテリー回復概要
 * @returns 説明文
 */
function recoverBatteryOverview(burst: RecoverBattery): string {
  return `バッテリー${burst.recoverBattery}回復、次自分ターンにバッテリー${burst.turnStartBatteryCorrect}回復`;
}

/**
 * 攻撃バフ概要
 * @param burst バースト情報
 * @returns 説明文
 */
function powerBuffOverview(burst: BuffPower): string {
  return `バッテリー${burst.recoverBattery}回復、攻撃+${burst.buffPower}`;
}

/**
 * ダメージ反射概要
 * @param burst バースト情報
 * @returns 説明文
 */
function lightningBarrierOverview(burst: LightningBarrier): string {
  return `バッテリー${burst.recoverBattery}回復、${burst.damage}ダメージのカウンター`;
}

/**
 * 連続攻撃概要
 * @param burst バースト情報
 * @returns 説明文
 */
function continuousAttackOverview(burst: ContinuousAttack): string {
  return `バッテリー${burst.recoverBattery}回復、2回行動`;
}

/**
 * バッテリーリミットブレイク概要
 * @param burst バースト情報
 * @returns 説明文
 */
function batteryLimitBreakOverview(burst: BatteryLimitBreak): string {
  return `バッテリー最大値を${burst.maxBattery}にして、バッテリー${burst.recoverBattery}回復`;
}

/**
 * 強制ターンエンド概要
 * @param burst バースト情報
 * @returns 説明文
 */
function forceTurnEndOverview(burst: ForceTurnEnd): string {
  return `バッテリー${burst.recoverBattery}回復、強制的に自分ターンにする`;
}

/**
 * 効果無効化概要
 * @param burst バースト情報
 * @returns 説明文
 */
function ineffectiveOverview(burst: Ineffective): string {
  return `バッテリー${burst.recoverBattery}回復、相手の効果を無視する`;
}

/**
 * 効果クリア概要
 * @param burst バースト情報
 * @returns 説明文
 */
function effectClearOverview(burst: EffectClear): string {
  return `バッテリー${burst.recoverBattery}回復、相手にかかっているすべての効果を消す`;
}

/**
 * バースト概要を生成する
 * @param burst バースト情報
 * @returns 説明文
 */
export function burstOverview(burst: Burst): string {
  switch (burst.type) {
    case "RecoverBattery":
      return recoverBatteryOverview(burst);
    case "BuffPower":
      return powerBuffOverview(burst);
    case "LightningBarrier":
      return lightningBarrierOverview(burst);
    case "ContinuousAttack":
      return continuousAttackOverview(burst);
    case "BatteryLimitBreak":
      return batteryLimitBreakOverview(burst);
    case "ForceTurnEnd":
      return forceTurnEndOverview(burst);
    case "Ineffective":
      return ineffectiveOverview(burst);
    case "EffectClear":
      return effectClearOverview(burst);
    default:
      return "";
  }
}
