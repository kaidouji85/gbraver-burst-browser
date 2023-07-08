import type {
  BatteryEnchantmentSkill,
  BuffPowerSkill,
  PilotSkill,
  RecoverBatterySkill,
} from "gbraver-burst-core";

/**
 * パイロットスキル概要
 * @param skill スキル情報
 * @return 説明文
 */
export function pilotSkillOverview(skill: PilotSkill): string {
  switch (skill.type) {
    case "RecoverBatterySkill":
      return recoverBatterySkill(skill);

    case "BuffPowerSkill":
      return buffPowerSkillTemplate(skill);

    case "BatteryEnchantmentSkill":
      return batteryEnchantmentSkillTemplate(skill);

    case "DamageHalvedSkill":
      return damageHalvedSkillTemplate();

    default:
      return "";
  }
}

/**
 * バッテリー回復概要
 * @param skill スキル情報
 * @return 説明文
 */
function recoverBatterySkill(skill: RecoverBatterySkill): string {
  return `バッテリー${skill.recoverBattery}回復`;
}

/**
 * 攻撃バフ概要
 * @param skill スキル情報
 * @return 説明文
 */
function buffPowerSkillTemplate(skill: BuffPowerSkill): string {
  return `攻撃+${skill.buffPower}`;
}

/**
 * バッテリー増強概要
 * @param skill スキル情報
 * @return 説明文
 */
function batteryEnchantmentSkillTemplate(
  skill: BatteryEnchantmentSkill,
): string {
  return `自分が出したバッテリー+${skill.batteryEnchantment}`;
}

/**
 * ダメージ半減概要
 * @return 説明文
 */
function damageHalvedSkillTemplate(): string {
  return `被ダメージ1/2`;
}
