import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ライト攻撃時の叫び
 * @return パイロット叫び情報
 */
export const raitoAttackShout = (): PilotSkillShout => ({
  face: "Raito",
  message: `ここは様子見や`,
});

/**
 * ライト防御時の叫び
 * @return パイロット叫び情報
 */
export const raitoDefenseShout = (): PilotSkillShout => ({
  face: "Raito",
  message: `バッチ来いや`,
});
