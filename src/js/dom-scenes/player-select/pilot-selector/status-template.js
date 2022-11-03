// @flow
import type {
  BatteryEnchantmentSkill,
  BuffPowerSkill,
  DamageHalvedSkill,
  PilotSkill,
  RecoverBatterySkill,
} from "gbraver-burst-core";

/**
 * パイロットスキルのテンプレート
 *
 * @param skill スキル内容
 * @return スキル文言
 */
export function pilotSkillTemplate(skill: PilotSkill): string[] {
  switch (skill.type) {
    case "RecoverBatterySkill":
      return recoverBatterySkillTemplate(skill);
    case "BuffPowerSkill":
      return buffPowerSkillTemplate(skill);
    case "BatteryEnchantmentSkill":
      return batteryEnchantmentSkillTemplate(skill);
    case "DamageHalvedSkill":
      return damageHalvedSkillTemplate(skill);
    default:
      return [];
  }
}

/**
 * パイロットスキル バッテリー回復
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function recoverBatterySkillTemplate(skill: RecoverBatterySkill): string[] {
  return [`バッテリーを${skill.recoverBattery}回復する。`];
}

/**
 * パイロットスキル 攻撃バフ
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function buffPowerSkillTemplate(skill: BuffPowerSkill): string[] {
  return [`${skill.duration}ターンだけ、攻撃+${skill.buffPower}する。`];
}

/**
 * パイロットスキル バッテリー増強
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function batteryEnchantmentSkillTemplate(
  skill: BatteryEnchantmentSkill
): string[] {
  return [
    `${skill.duration}ターンだけ、0より大きいバッテリーを出した場合にバッテリー+${skill.batteryEnchantment}する。`,
    `ただしバーストによる攻撃力アップが半減する。`,
  ];
}

/**
 * パイロットスキル ダメージ半減
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function damageHalvedSkillTemplate(skill: DamageHalvedSkill): string[] {
  return [`${skill.duration}ターンだけ、全てのダメージを1/2にする。`];
}
