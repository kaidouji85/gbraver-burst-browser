import { PlayerState } from "gbraver-burst-core";

import { wbr } from "../../../../dom/wbr";
import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ツバサ攻撃時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const tsubasaAttackShout = (player: PlayerState): PilotSkillShout => ({
  face: "Tsubasa",
  message: `共に駆けよう${wbr} ${player.armdozer.name}`,
});

/**
 * ツバサ防御時の叫び
 * @returns パイロット叫び情報
 */
export const tsubasaDefenseShout = (): PilotSkillShout => ({
  face: "Tsubasa",
  message: `このターンを${wbr}凌げれば`,
});
