import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ゲージのテクスチャ設定をまとめたもの */
export const GaugeTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.HP_NUMBER,
    path: "gauge/hp-gauge-number.webp",
  },
  {
    id: TEXTURE_IDS.PLAYER_HP_GAUGE,
    path: "gauge/player-hp-gauge.webp",
  },
  {
    id: TEXTURE_IDS.PLAYER_BATTERY_GAUGE,
    path: "gauge/player-battery-gauge.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_HP_GAUGE,
    path: "gauge/enemy-hp-gauge.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_BATTERY_GAUGE,
    path: "gauge/enemy-battery-gauge.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
