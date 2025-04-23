import { PilotIds } from "gbraver-burst-core";

import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** シンヤのテクスチャ設定をあつめたもの */
export const ShinyaTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.SHINYA_CUTIN,
    path: "pilot/shinya/skill-cutin.webp",
  },
].map((t) => ({ ...t, type: "DynamicPilot", pilotId: PilotIds.SHINYA }));
