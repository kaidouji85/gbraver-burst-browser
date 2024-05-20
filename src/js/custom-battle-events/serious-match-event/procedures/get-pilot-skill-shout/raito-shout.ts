import { wbr } from "../../../../dom/wbr";
import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ライト攻撃時の叫び
 * @returns パイロット叫び情報
 */
export const raitoAttackShout = (): PilotSkillShout => ({
  face: "Raito",
  message: `ここは${wbr}様子見や`,
});

/**
 * ライト防御時の叫び
 * @returns パイロット叫び情報
 */
export const raitoDefenseShout = (): PilotSkillShout => ({
  face: "Raito",
  message: `バッチ来いや`,
});
