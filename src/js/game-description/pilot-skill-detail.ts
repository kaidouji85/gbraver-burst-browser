import type {
  BatteryBoostSkill,
  BatteryEnchantmentSkill,
  BuffPowerSkill,
  DamageHalvedSkill,
  PilotSkill,
  RecoverBatterySkill,
} from "gbraver-burst-core";

/**
 * バッテリー回復詳細
 * @param skill スキル情報
 * @returns 説明文
 */
function recoverBatterySkillDetail(skill: RecoverBatterySkill): string[] {
  return [`バッテリーを${skill.recoverBattery}回復する。`];
}

/**
 * 攻撃バフ詳細
 * @param skill スキル情報
 * @returns 説明文
 */
function buffPowerSkillDetail(skill: BuffPowerSkill): string[] {
  return [`${skill.duration}ターンだけ、攻撃+${skill.buffPower}する。`];
}

/**
 * バッテリー増強詳細
 * @param skill スキル情報
 * @returns 説明文
 */
function batteryEnchantmentSkillDetail(
  skill: BatteryEnchantmentSkill,
): string[] {
  return [
    `${skill.duration}ターンだけ、0より大きいバッテリーを出した場合にバッテリー+${skill.batteryEnchantment}する。`,
    `ただしバーストによる攻撃力アップが半減する。`,
  ];
}

/**
 * ダメージ半減詳細
 * @param skill スキル情報
 * @returns 説明文
 */
function damageHalvedSkillDetail(skill: DamageHalvedSkill): string[] {
  return [
    `${skill.duration}ターンだけ、全ての被ダメージを1/2にする。この効果は、0防御した時に無効となる。`,
  ];
}

/**
 * バッテリーブースト詳細
 * @param skill スキル情報
 * @returns 説明文
 */
function batteryBoostSkillDetail(skill: BatteryBoostSkill): string[] {
  return [
    `バッテリーを${skill.recoverBattery}回復する。`,
    `ただし次の自分ターン開始時には、バッテリーが回復しない。`,
  ];
}

/**
 * パイロットスキル詳細
 * @param skill スキル情報
 * @returns 説明文
 */
export function pilotSkillDetail(skill: PilotSkill): string[] {
  switch (skill.type) {
    case "RecoverBatterySkill":
      return recoverBatterySkillDetail(skill);
    case "BuffPowerSkill":
      return buffPowerSkillDetail(skill);
    case "BatteryEnchantmentSkill":
      return batteryEnchantmentSkillDetail(skill);
    case "DamageHalvedSkill":
      return damageHalvedSkillDetail(skill);
    case "BatteryBoostSkill":
      return batteryBoostSkillDetail(skill);
    default:
      return [];
  }
}
