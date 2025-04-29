import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** バッテリー数字のテクスチャ設定をあつめたもの */
export const BatteryNumberTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.BATTERY_NUMBER,
    path: "battery-number/battery-number.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
