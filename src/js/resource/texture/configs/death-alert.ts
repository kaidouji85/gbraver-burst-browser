import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** デスアラートのテクスチャ設定をあつめたもの */
export const DeathAlertTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.DEATH_ALERT_VIGNETTE,
    path: "death-alert-vignette.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
