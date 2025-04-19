import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ツバサのテクスチャ設定をあつめたもの */
export const TsubasaTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.TSUBASA_CUTIN,
    path: "pilot/tsubasa/skill-cutin.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
