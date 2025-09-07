import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ステータスアイコンのテクスチャ設定をあつめたもの */
export const StatusIconConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.STATUS_ICON,
    path: "button/status-icon.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
