import { NPC } from "../../../npc/npc";
import { SoundId } from "../../../resource/sound/resource";

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  caption: string[];
  /** 対戦相手 */
  npc: NPC;
  /** 再生するBGMのID */
  bgm: SoundId;
};
