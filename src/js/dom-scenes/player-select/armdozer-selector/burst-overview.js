// @flow

import type {
  BuffPower,
  Burst,
  ContinuousAttack,
  LightningBarrier,
} from "gbraver-burst-core";

/**
 * バースト概要を生成する
 * @param burst バースト情報
 * @return 説明文
 */
export function burstOverview(burst: Burst): string {
  switch (burst.type) {
    case "RecoverBattery":
      return recoverBatteryOverview();
    case "BuffPower":
      return powerBuffOverview(burst);
    case "LightningBarrier":
      return lightningBarrierOverview(burst);
    case "ContinuousAttack":
      return continuousAttackOverview(burst);
    default:
      return "";
  }
}

/**
 * バッテリー回復概要
 * @param burst バースト情報
 * @return 説明文
 */
function recoverBatteryOverview(): string {
  return `バッテリー全回復`;
}

/**
 * 攻撃バフ概要
 * @param burst バースト情報
 * @return 説明文
 */
function powerBuffOverview(burst: BuffPower): string {
  return `バッテリー${burst.recoverBattery}回復、攻撃+${burst.buffPower}`;
}

/**
 * ダメージ反射概要
 * @param burst バースト情報
 * @return 説明文
 */
function lightningBarrierOverview(burst: LightningBarrier): string {
  return `バッテリー${burst.recoverBattery}回復、${burst.damage}ダメージのカウンター`;
}

/**
 * 連続攻撃概要
 * @param burst バースト情報
 * @return 説明文
 */
function continuousAttackOverview(burst: ContinuousAttack): string {
  return `バッテリー${burst.recoverBattery}回復、2回攻撃`;
}
