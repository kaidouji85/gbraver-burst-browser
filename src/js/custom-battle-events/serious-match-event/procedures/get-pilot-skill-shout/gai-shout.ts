import { PlayerState } from "gbraver-burst-core";

import { wbr } from "../../../../dom/wbr";
import { PilotSkillShout } from "./pilot-skill-shout";

/**
 * ガイ攻撃時の叫び
 * @param player プレイヤー情報
 * @returns パイロット叫び情報
 */
export const gaiAttackShout = (player: PlayerState): PilotSkillShout => ({
  face: "Gai",
  message: `${player.armdozer.name}${wbr} パワー全開`,
});

/**
 * ガイ防御時の叫び
 * @returns パイロット叫び情報
 */
export const gaiDefenseShout = (): PilotSkillShout => ({
  face: "Gai",
  message: `次のターン${wbr} お前の命は${wbr}ないぞ`,
});
