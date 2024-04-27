import { PlayerState } from "gbraver-burst-core";

import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ユウヤ攻撃時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const yuuyaAttackShout = (player: PlayerState): PilotSkillShout => ({
  face: "Yuuya",
  message: `限界突破だ ${player.armdozer.name}`,
});

/**
 * ユウヤ防御時の叫び
 * @returns パイロット叫び情報
 */
export const yuuyaDefenseShout = (player: PlayerState): PilotSkillShout => ({
  face: "Yuuya",
  message: `${player.armdozer.name} お前の力はそんなものか`,
});
