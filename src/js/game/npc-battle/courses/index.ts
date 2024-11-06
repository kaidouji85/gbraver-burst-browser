import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleStage } from "../npc-battle";
import { NPCBattleCourse } from "../npc-battle-course";
import { GenesisBraverEasy } from "./genesis-braver-easy";
import { GenesisBraverHard } from "./genesis-braver-hard";
import { GenesisBraverNormal } from "./genesis-braver-normal";
import { GenesisBraverVeryHard } from "./genesis-braver-very-hard";
import { LightningDozerEasy } from "./lightning-dozer-easy";
import { LightningDozerHard } from "./lightning-dozer-hard";
import { LightningDozerNormal } from "./lightning-dozer-normal";
import { LightningDozerVeryHard } from "./lightning-dozer-very-hard";
import { NeoLandozerEasy } from "./neo-landozer-easy";
import { NeoLandozerHard } from "./neo-landozer-hard";
import { NeoLandozerNormal } from "./neo-landozer-normal";
import { NeoLandozerVeryHard } from "./neo-landozer-very-hard";
import {
  Attack3Defense2LightningDozerStage,
  MaxAttackWingDozerStage,
  OneBatteryNeoLandozerStage,
} from "./npc-battle-stage";
import { ShinBraverEasy } from "./shin-braver-easy";
import { ShinBraverHard } from "./shin-braver-hard";
import { ShinBraverNormal } from "./shin-braver-normal";
import { ShinBraverVeryHard } from "./shin-braver-very-hard";
import { WingDozerEasy } from "./wing-dozer-easy";
import { WingDozerHard } from "./wing-dozer-hard";
import { WingDozerNormal } from "./wing-dozer-normal";
import { WingDozerVeryHard } from "./wing-dozer-very-hard";

/** デフォルトのステージ集合 */
export const DefaultStages: NPCBattleStage[] = [
  { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
  { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
  { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
];

/** NPCバトルコース */
export const NPCBattleCourses: NPCBattleCourse[] = [
  ShinBraverEasy,
  ShinBraverNormal,
  ShinBraverHard,
  ShinBraverVeryHard,
  NeoLandozerEasy,
  NeoLandozerNormal,
  NeoLandozerHard,
  NeoLandozerVeryHard,
  LightningDozerEasy,
  LightningDozerNormal,
  LightningDozerHard,
  LightningDozerVeryHard,
  WingDozerEasy,
  WingDozerNormal,
  WingDozerHard,
  WingDozerVeryHard,
  GenesisBraverEasy,
  GenesisBraverNormal,
  GenesisBraverHard,
  GenesisBraverVeryHard,
];
