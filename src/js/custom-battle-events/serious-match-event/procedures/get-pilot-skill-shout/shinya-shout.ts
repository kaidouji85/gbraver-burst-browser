import { PlayerState } from "gbraver-burst-core";

import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * シンヤ攻撃時の叫び
 * @returns パイロット叫び情報
 */
export const shinyaAttackShout = (): PilotSkillShout => ({
  face: "Shinya",
  message: `ここで勝負をかけるッス`,
});

/**
 * シンヤ防御時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const shinyaDefenseShout = (player: PlayerState): PilotSkillShout => ({
  face: "Shinya",
  message: `${player.armdozer.name} ここは堪えるッス`,
});
