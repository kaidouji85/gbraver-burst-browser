// @flow

import type {BuffPowerSkill, PilotSkill, RecoverBatterySkill, DamageDecreaseSkill} from 'gbraver-burst-core';
import type {BatteryEnchantmentSkill} from "gbraver-burst-core/lib/player/pilot";

/**
 * パイロットスキルのテンプレート
 *
 * @param skill スキル内容
 * @return スキル文言
 */
export function pilotSkillTemplate(skill: PilotSkill): string {
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
      return '';
  }
}

/**
 * パイロットスキル バッテリー回復
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function recoverBatterySkillTemplate(skill: RecoverBatterySkill): string {
  return `バッテリーを${skill.recoverBattery}回復`;
}

/**
 * パイロットスキル 攻撃バフ
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function buffPowerSkillTemplate(skill: BuffPowerSkill): string {
  return `${skill.duration}ターンだけ攻撃+${skill.buffPower}`;
}

/**
 * パイロットスキル ダメージ減少
 * @param skill スキル詳細
 * @return スキル文言
 */
function damageDecreaseSkillTemplate(skill: DamageDecreaseSkill): string {
  return `${skill.duration}ターンだけダメージ${skill.decrease}減少`;
}

/**
 * パイロットスキル バッテリー増強
 *
 * @param skill スキル詳細
 * @return スキル文言
 */
function batteryEnchantmentSkillTemplate(skill: BatteryEnchantmentSkill): string {
  return `このターンに出したバッテリー+${skill.batteryEnchantment}、ただし次のターンに出したバッテリー -${skill.batteryEnchantment}`;
}