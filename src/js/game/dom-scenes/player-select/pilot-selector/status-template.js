// @flow

import type {BuffPowerSkill, PilotSkill, RecoverBatterySkill, DamageDecreaseSkill, BatteryEnchantmentSkill} from 'gbraver-burst-core';

/**
 * パイロットスキルのテンプレート
 *
 * @param skill スキル内容
 * @return スキル文言
 */
export function pilotSkillTemplate(skill: PilotSkill): string[] {
  switch(skill.type)  {
    case 'RecoverBatterySkill':
      return recoverBatterySkillTemplate(skill);
    case 'BuffPowerSkill':
      return buffPowerSkillTemplate(skill);
    case 'DamageDecreaseSkill':
      return damageDecreaseSkillTemplate(skill);
    case 'BatteryEnchantmentSkill':
      return batteryEnchantmentSkillTemplate(skill);
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
 * パイロットスキル ダメージ減少
 * @param skill スキル詳細
 * @return スキル文言
 */
function damageDecreaseSkillTemplate(skill: DamageDecreaseSkill): string[] {
  return [`${skill.duration}ターンだけ、全てのダメージを-${skill.decrease}する。`];
}

/**
 * パイロットスキル バッテリー増強
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function batteryEnchantmentSkillTemplate(skill: BatteryEnchantmentSkill): string[] {
  return [
    `${skill.duration}ターンだけ、0より大きいバッテリーを出した場合にバッテリー+${skill.batteryEnchantment}するが、攻撃補正が半分になる。`,
  ];
}