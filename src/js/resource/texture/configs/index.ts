import { TextureConfig } from "../resource";
import { BatteryNumberTextureConfigs } from "./battery-number";
import { BatterySelectorTextureConfigs } from "./battery-selector";
import { DamageNumberTextureConfigs } from "./damage-number";
import { EffectLabelTextureConfigs } from "./effect-label";
import { GaiTextureConfigs } from "./gai";
import { GaugeTextureConfigs } from "./gauge";
import { GenesisBraverTextureConfigs } from "./genesis-braver";
import { GranDozerTextureConfigs } from "./gran-dozer";
import { LightingTextureConfigs } from "./lightning";
import { LightningBarrierTextureConfigs } from "./lightning-barrier";
import { LightningDozerTextureConfigs } from "./lightning-dozer";
import { NeoLandozerTextureConfigs } from "./neo-landozer";
import { PredicatedDamageTextureConfigs } from "./predicated-damage";
import { RaitoTextureConfigs } from "./raito";
import { ResultTextureConfigs } from "./result";
import { ShinBraverTextureConfigs } from "./shin-braver";
import { ShockWaveTextureConfigs } from "./shock-wave";
import { ShinyaTextureConfigs } from "./sinya";
import { TsubasaTextureConfigs } from "./tsubasa";
import { TurnTexureConfigs } from "./turn";
import { WingDozerTextureConfigs } from "./wing-dozer";
import { YuuyaTextureConfigs } from "./yuuya";

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
  ...ResultTextureConfigs,
  ...YuuyaTextureConfigs,
  ...PredicatedDamageTextureConfigs,
];

/** 開発中のテクスチャリソース設定をあつめたもの */
export const DEVELOPING_TEXTURE_CONFIGS: TextureConfig[] = [
  ...GranDozerTextureConfigs,
];
