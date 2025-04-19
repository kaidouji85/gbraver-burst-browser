import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** バッテリーセレクタのテクスチャ設定をまとめたもの */
export const BatterySelectorTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.BATTERY_SELECTOR_NUMBER,
    path: "battery-selector/active-number.webp",
  },
  {
    id: TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER,
    path: "battery-selector/dis-active-number.webp",
  },
  {
    id: TEXTURE_IDS.BATTERY_CURRENT_VALUE,
    path: "battery-selector/current-battery.webp",
  },
  {
    id: TEXTURE_IDS.BATTERY_METER_8,
    path: "battery-selector/meter-8.webp",
  },
  {
    id: TEXTURE_IDS.BATTERY_METER_4,
    path: "battery-selector/meter-4.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
