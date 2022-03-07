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
  return [`バッテリーを${burst.recoverBattery}回復する。`];
}

/**
 * 攻撃バフの説明文テンプレート
 *
 * @param burst バースト詳細
 * @return 説明文
 */
function powerBuffTemplate(burst: BuffPower): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `${burst.duration}ターンだけ、攻撃+${burst.buffPower}する。`,
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
    `バッテリーを${burst.recoverBattery}回復する。`,
    `${burst.duration}ターンだけ、相手の攻撃がヒットした場合、相手に${burst.damage}ダメージを与える。`,
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
    `バッテリーを${burst.recoverBattery}回復する。`,
    `自分ターン終了時に再び自分ターンとなるが、ターン開始時のバッテリー回復はスキップする。`,
  ];
}