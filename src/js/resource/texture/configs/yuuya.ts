import { PilotIds } from "gbraver-burst-core";

import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ユウヤのテクスチャ設定をあつめたもの */
export const YuuyaTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.YUUYA_CUTIN,
    path: "pilot/yuuya/skill-cutin.webp",
  },
].map((t) => ({ ...t, type: "DynamicPilot", pilotId: PilotIds.YUUYA }));
