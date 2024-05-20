import { PlayerState } from "gbraver-burst-core";

import { wbr } from "../../../../dom/wbr";
import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * シンヤ攻撃時の叫び
 * @returns パイロット叫び情報
 */
export const shinyaAttackShout = (): PilotSkillShout => ({
  face: "Shinya",
  message: `ここで${wbr}勝負を${wbr}かけるッス`,
});

/**
 * シンヤ防御時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const shinyaDefenseShout = (player: PlayerState): PilotSkillShout => ({
  face: "Shinya",
  message: `${player.armdozer.name}${wbr} ここは<wbr>堪えるッス`,
});
