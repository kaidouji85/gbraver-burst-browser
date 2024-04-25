import { PlayerState } from "gbraver-burst-core";

import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ツバサ攻撃時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const tsubasaAttackShout = (player: PlayerState): PilotSkillShout => ({
  face: "Tsubasa",
  message: `共に駆けよう ${player.armdozer.name}`,
});

/**
 * ツバサ防御時の叫び
 * @returns パイロット叫び情報
 */
export const tsubasaDefenseShout = (): PilotSkillShout => ({
  face: "Tsubasa",
  message: `このターンを凌げれば`,
});
