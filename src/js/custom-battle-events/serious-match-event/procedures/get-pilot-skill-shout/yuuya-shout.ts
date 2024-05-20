import { PlayerState } from "gbraver-burst-core";

import { wbr } from "../../../../dom/wbr";
import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ユウヤ攻撃時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const yuuyaAttackShout = (player: PlayerState): PilotSkillShout => ({
  face: "Yuuya",
  message: `限界突破だ${wbr} ${player.armdozer.name}`,
});

/**
 * ユウヤ防御時の叫び
 * @returns パイロット叫び情報
 */
export const yuuyaDefenseShout = (player: PlayerState): PilotSkillShout => ({
  face: "Yuuya",
  message: `${player.armdozer.name}${wbr} お前の${wbr}力は${wbr}そんなものか`,
});
