// @flow

import type {BuffPower, Burst, ContinuousAttack, LightningBarrier, RecoverBattery} from "gbraver-burst-core";

/**
 * バーストの説明文テンプレート
 *
 * @param burst バースト詳細
 * @return 説明文
 */
export function burstTemplate(burst: Burst): string[] {
  switch(burst.type) {
    case 'RecoverBattery':
      return recoverBatteryTemplate(burst);
    case 'BuffPower':
      return powerBuffTemplate(burst);
    case 'LightningBarrier':
      return lightningBarrierTemplate(burst);
    case 'ContinuousAttack':
      return continuousAttackTemplate(burst);
    default:
      return [];
  }
}

/**
 * バッテリー回復の説明文テンプレート
 *
 * @param burst バースト詳細
 * @return 説明文
 */
function recoverBatteryTemplate(burst: RecoverBattery): string[] {
  return [`バッテリーを${burst.recoverBattery}回復`];
}

/**
 * 攻撃バフの説明文テンプレート
 *
 * @param burst バースト詳細
 * @return 説明文
 */
function powerBuffTemplate(burst: BuffPower): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復`,
    `${burst.duration}ターンだけ攻撃+${burst.buffPower}`,
  ];
}

/**
 * ダメージ反射の説明文テンプレート
 *
 * @param burst バースト詳細
 * @return 説明文
 */
function lightningBarrierTemplate(burst: LightningBarrier): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復`,
    `${burst.duration}ターンだけ${burst.damage}のダメージ反射`,
  ];
}

/**
 * 連続攻撃の説明文テンプレート
 *
 * @param burst バースト詳細
 * @return 説明文
 */
function continuousAttackTemplate(burst: ContinuousAttack): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復`,
    `1回だけ連続攻撃ができる`,
  ];
}