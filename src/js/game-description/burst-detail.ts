import type {
  BatteryLimitBreak,
  BuffPower,
  Burst,
  ContinuousAttack,
  ForceTurnEnd,
  Ineffective,
  LightningBarrier,
  RecoverBattery,
} from "gbraver-burst-core";

/**
 * バッテリー回復詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function recoverBatteryDetail(burst: RecoverBattery): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `次の自分ターン開始時に、バッテリーを${burst.turnStartBatteryCorrect}回復する。`,
  ];
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

/**
 * 強制ターンエンド詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function forceTurnEndDetail(burst: ForceTurnEnd): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `現在のターンを終了し、バッテリー回復なしで自分ターンを開始する。`,
    `この効果でターン終了した場合、「ターン終了時に発動する効果」は発動しない。`,
  ];
}

/**
 * 効果無効化詳細
 * @param burst バースト情報
 * @returns 説明文
 */
function ineffectiveDetail(burst: Ineffective): string[] {
  return [
    `バッテリーを${burst.recoverBattery}回復する。`,
    `1ターンだけ、戦闘中に相手の効果が無効化される。`,
  ];
}

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
    case "ForceTurnEnd":
      return forceTurnEndDetail(burst);
    case "Ineffective":
      return ineffectiveDetail(burst);
    default:
      return [];
  }
}
