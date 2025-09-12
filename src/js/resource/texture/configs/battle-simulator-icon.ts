import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** バトルシミュレーターアイコンのテクスチャ設定をあつめたもの */
export const BattleSimulatorIconConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.BATTLE_SIMULATOR_ICON,
    path: "button/battle-simulator-icon.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
