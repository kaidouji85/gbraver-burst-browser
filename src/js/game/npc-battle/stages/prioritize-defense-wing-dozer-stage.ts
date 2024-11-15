import { prioritizeDefenseWingDozer } from "../../../npc/prioritize-defense";

/** 防御優先 ウィングドーザ */
export const PrioritizeDefenseWingDozerStage = {
  caption: ["0攻撃で敵を消耗させろ"],
  npc: prioritizeDefenseWingDozer(),
};
