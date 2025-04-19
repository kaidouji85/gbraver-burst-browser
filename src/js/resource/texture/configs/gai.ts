import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ガイのテクスチャ設定をあつめたもの */
export const GaiTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.GAI_CUTIN,
    path: "pilot/gai/skill-cutin.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
