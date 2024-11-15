import { prioritizeDefenseShinBraverNPC } from "../../../npc/prioritize-defense";
import { PrioritizeDefenseWingDozerStage } from "./prioritize-defense-wing-dozer-stage";

/** 防御優先 シンブレイバー */
export const PrioritizeDefenseShinBraverStage = {
  caption: PrioritizeDefenseWingDozerStage.caption,
  npc: prioritizeDefenseShinBraverNPC(),
};
