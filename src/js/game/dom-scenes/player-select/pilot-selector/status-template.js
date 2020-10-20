// @flow

import type {BuffPowerSkill, PilotSkill, RecoverBatterySkill} from 'gbraver-burst-core';

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
  return `2ターンだけ攻撃+${skill.buffPower}`;
}