import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ターン系のテクスチャ設定をあつめたもの */
export const TurnTexureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.PLAYER_TURN,
    path: "turn/player-turn.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_TURN,
    path: "turn/enemy-turn.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
