import { hardNeoLandozer } from "../../../npc/hard-neo-landozer";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleStage } from "./npc-battle-stage";

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ["敵よりも大きいバッテリーを出せ"],
  npc: hardNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
