import { PilotIds } from "gbraver-burst-core";

import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ライトのテクスチャ設定をあつめたもの */
export const RaitoTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.RAITO_CUTIN,
    path: "pilot/raito/skill-cutin.webp",
  },
].map((t) => ({ ...t, type: "DynamicPilot", pilotId: PilotIds.RAITO }));
