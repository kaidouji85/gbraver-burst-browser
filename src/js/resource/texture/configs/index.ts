import { TEXTURE_IDS } from "../ids";
import type { TextureConfig } from "../resource";
import { BatteryNumberTextureConfigs } from "./battery-number";
import { BatterySelectorTextureConfigs } from "./battery-selector";
import { DamageNumberTextureConfigs } from "./damage-number";
import { EffectLabelTextureConfigs } from "./effect-label";
import { GaiTextureConfigs } from "./gai";
import { GaugeTextureConfigs } from "./gauge";
import { GenesisBraverTextureConfigs } from "./genesis-braver";
import { LightingTextureConfigs } from "./lightning";
import { LightningBarrierTextureConfigs } from "./lightning-barrier";
import { LightningDozerTextureConfigs } from "./lightning-dozer";
import { NeoLandozerTextureConfigs } from "./neo-landozer";
import { RaitoTextureConfigs } from "./raito";
import { ShinBraverTextureConfigs } from "./shin-braver";
import { ShockWaveTextureConfigs } from "./shock-wave";
import { ShinyaTextureConfigs } from "./sinya";
import { TsubasaTextureConfigs } from "./tsubasa";
import { TurnTexureConfigs } from "./turn";
import { WingDozerTextureConfigs } from "./wing-dozer";

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: TextureConfig[] = [
  ...ShinBraverTextureConfigs,
  ...NeoLandozerTextureConfigs,
  ...LightningDozerTextureConfigs,
  ...WingDozerTextureConfigs,
  ...GenesisBraverTextureConfigs,
  ...ShinyaTextureConfigs,
  ...GaiTextureConfigs,
  ...RaitoTextureConfigs,
  ...TsubasaTextureConfigs,
  ...ShockWaveTextureConfigs,
  ...LightingTextureConfigs,
  ...LightningBarrierTextureConfigs,
  ...BatteryNumberTextureConfigs,
  ...DamageNumberTextureConfigs,
  ...GaugeTextureConfigs,
  ...BatterySelectorTextureConfigs,
  ...TurnTexureConfigs,
  ...EffectLabelTextureConfigs,
  // リザルト
  {
    id: TEXTURE_IDS.WIN,
    path: "result/win.png",
  },
  {
    id: TEXTURE_IDS.LOSE,
    path: "result/lose.png",
  },
  {
    id: TEXTURE_IDS.DRAW,
    path: "result/draw.png",
  },
];

/** 開発中のテクスチャリソース設定をあつめたもの */
export const DEVELOPING_TEXTURE_CONFIGS: TextureConfig[] = [];
