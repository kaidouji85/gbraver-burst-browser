import type {
  BatteryLimitBreak,
  BuffPower,
  Burst,
  ContinuousAttack,
  LightningBarrier,
  RecoverBattery,
} from "gbraver-burst-core";

/**
 * バースト詳細を生成する
 * @param burst 情報
 * @returns 説明文
 */
export function burstDetail(burst: Burst): string[] {
  switch (burst.type) {
    case "RecoverBattery":
      return recoverBatteryDetail(burst);
    case "BuffPower":
      return powerBuffDetail(burst);
    case "LightningBarrier":
      return lightningBarrierDetail(burst);
    case "ContinuousAttack":
      return continuousAttackDetail(burst);
    case "BatteryLimitBreak":
      return batteryLimitBreakDetail(burst);
    default:
      return [];
  }
}

/**
 * バッテリー回復詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function recoverBatteryDetail(burst: RecoverBattery): string[] {
  return [`バッテリーを${burst.recoverBattery}回復する。`];
}

/**
 * 攻撃バフ詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function powerBuffDetail(burst: BuffPower): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `${burst.duration}ターンだけ、攻撃+${burst.buffPower}する。`,
  ];
}

/**
 * ダメージ反射詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function lightningBarrierDetail(burst: LightningBarrier): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `${burst.duration}ターンだけ、相手の攻撃がヒットした場合、相手に${burst.damage}ダメージを与える。`,
  ];
}

/**
 * 連続攻撃詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function continuousAttackDetail(burst: ContinuousAttack): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `自分ターン終了時に、バッテリー回復なしで再び自分ターンとなる。`,
  ];
}

/**
 * バッテリーリミットブレイク詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function batteryLimitBreakDetail(burst: BatteryLimitBreak): string[] {
  return [
    `ゲーム終了まで、最大バッテリーを${burst.maxBattery}にする。`,
    `バッテリーを${burst.recoverBattery}回復する。`,
  ];
}
