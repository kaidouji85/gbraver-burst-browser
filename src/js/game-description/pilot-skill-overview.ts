import type {
  BatteryBoostSkill,
  BatteryEnhancementSkill,
  BuffPowerSkill,
  PilotSkill,
  RecoverBatterySkill,
} from "gbraver-burst-core";

/**
 * バッテリー回復概要
 * @param skill スキル情報
 * @returns 説明文
 */
function recoverBatterySkill(skill: RecoverBatterySkill): string {
  return `バッテリー${skill.recoverBattery}回復`;
}

/**
 * 攻撃バフ概要
 * @param skill スキル情報
 * @returns 説明文
 */
function buffPowerSkill(skill: BuffPowerSkill): string {
  return `攻撃+${skill.buffPower}`;
}

/**
 * バッテリー増強概要
 * @param skill スキル情報
 * @returns 説明文
 */
function batteryEnhancementSkill(skill: BatteryEnhancementSkill): string {
  return `自分が出したバッテリー+${skill.batteryEnhancement}`;
}

/**
 * ダメージ半減概要
 * @returns 説明文
 */
function damageHalvedSkill(): string {
  return `被ダメージ1/2`;
}

/**
 * バッテリーブースト概要
 * @param skill スキル情報
 * @returns 説明文
 */
function batteryBoostSkill(skill: BatteryBoostSkill): string {
  return `バッテリー${skill.recoverBattery}回復、次ターンのバッテリー回復スキップ`;
}

/**
 * パイロットスキル概要
 * @param skill スキル情報
 * @returns 説明文
 */
export function pilotSkillOverview(skill: PilotSkill): string {
  switch (skill.type) {
    case "RecoverBatterySkill":
      return recoverBatterySkill(skill);
    case "BuffPowerSkill":
      return buffPowerSkill(skill);
    case "BatteryEnhancementSkill":
      return batteryEnhancementSkill(skill);
    case "DamageHalvedSkill":
      return damageHalvedSkill();
    case "BatteryBoostSkill":
      return batteryBoostSkill(skill);
    default:
      return "";
  }
}
