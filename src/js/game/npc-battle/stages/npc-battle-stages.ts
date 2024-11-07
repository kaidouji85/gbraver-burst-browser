import {
  attack3Defense2LightningDozerNPC,
  attack3Defense2ShinBraverNPC,
} from "../../../npc/attack-3-defense-2";
import {
  attack4Defense1LightningDozerNPC,
  attack4Defense1ShinBraverNPC,
} from "../../../npc/attack-4-defense-1";
import { burstAttack5NeoLandozer } from "../../../npc/burst-attack-5-neo-landozer";
import { fullAttackWingDozer } from "../../../npc/full-attack-wing-dozer";
import { genesisBraverNPC } from "../../../npc/genesis-braver";
import { hardLightningDozer } from "../../../npc/hard-lightning-dozer";
import { hardNeoLandozer } from "../../../npc/hard-neo-landozer";
import { hardShinBraver } from "../../../npc/hard-shin-braver";
import { hardWingDozer } from "../../../npc/hard-wing-dozer";
import {
  maxBatteryAttackShinBraverNPC,
  maxBatteryAttackWingDozerNPC,
} from "../../../npc/max-battery-attack";
import {
  oneBatteryNeoLandozerNPC,
  oneBatteryShinBraverNPC,
} from "../../../npc/one-battery";
import {
  prioritizeDefenseShinBraverNPC,
  prioritizeDefenseWingDozer,
} from "../../../npc/prioritize-defense";
import { veryHardLightningDozer } from "../../../npc/very-hard-lightning-dozer";
import { veryHardNeoLandozer } from "../../../npc/very-hard-neo-landozer";
import { veryHardShinBraver } from "../../../npc/very-hard-shin-braver";
import { veryHardWingDozerNPC } from "../../../npc/very-hard-wing-dozer";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleStage } from "./npc-battle-stage";

/** 1バッテリー ネオランドーザ */
export const OneBatteryNeoLandozerStage = {
  caption: ["敵よりも大きいバッテリーを出せ"],
  npc: oneBatteryNeoLandozerNPC(),
};

/** 1バッテリー シンブレイバー */
export const OneBatteryShinBraverStage = {
  caption: OneBatteryNeoLandozerStage.caption,
  npc: oneBatteryShinBraverNPC(),
};

/** 全力攻撃 ウィングドーザ */
export const MaxAttackWingDozerStage = {
  caption: ["ゼロ防御だと即死する"],
  npc: maxBatteryAttackWingDozerNPC(),
};

/** 全力攻撃 シンブレイバー */
export const MaxAttackShinBraverStage = {
  caption: MaxAttackWingDozerStage.caption,
  npc: maxBatteryAttackShinBraverNPC(),
};

/** 3攻撃2防御 ライトングドーザ */
export const Attack3Defense2LightningDozerStage = {
  caption: ["相手のバッテリー切れを狙え"],
  npc: attack3Defense2LightningDozerNPC(),
};

/** 3攻撃2防御 シンブレイバー */
export const Attack3Defense2ShinBraverStage = {
  caption: Attack3Defense2LightningDozerStage.caption,
  npc: attack3Defense2ShinBraverNPC(),
};

/** 4攻撃1防御 ライトニングドーザ */
export const Attack4Defense1LightningDozerStage = {
  caption: ["攻撃にはバッテリーを2以上使え"],
  npc: attack4Defense1LightningDozerNPC(),
};

/** 4攻撃1防御 シンブレイバー */
export const Attack4Defense1ShinBraverStage = {
  caption: Attack4Defense1LightningDozerStage.caption,
  npc: attack4Defense1ShinBraverNPC(),
};

/** 防御優先 ウィングドーザ */
export const PrioritizeDefenseWingDozerStage = {
  caption: ["0攻撃で敵を消耗させろ"],
  npc: prioritizeDefenseWingDozer(),
};

/** 防御優先 シンブレイバー */
export const PrioritizeDefenseShinBraverStage = {
  caption: PrioritizeDefenseWingDozerStage.caption,
  npc: prioritizeDefenseShinBraverNPC(),
};

/** 5攻撃+バースト ネオランドーザ */
export const BurstAttack5NeoLandozderStage = {
  caption: ["同じバッテリーだとダメージ半減"],
  npc: burstAttack5NeoLandozer(),
};

/** 攻撃全振り ウィングドーザ */
export const FullAttackWingDozerStage = {
  caption: ["バーストで相手を一撃粉砕せよ"],
  npc: fullAttackWingDozer(),
};

/** ハードコース シンブレイバー */
export const HardShinBraverStage = {
  caption: ["バーストでバッテリー回復せよ"],
  npc: hardShinBraver(),
};

/** ハードコース ネオランドーザ */
export const HardNeoLandozerStage = {
  caption: ["バースト後の攻撃は全力防御しろ"],
  npc: hardNeoLandozer(),
};

/** ハードコース ウィングドーザ */
export const HardWingDozerStage = {
  caption: ["バースト、パイロットをフル活用しろ"],
  npc: hardWingDozer(),
};

/** ハードコース ライトニングドーザ */
export const HardLightningDozer = {
  caption: ["0攻撃でバリアをやり過ごせ"],
  npc: hardLightningDozer(),
};

/** ベリーハードコース シンブレイバー */
export const VeryHardShinBraver = {
  caption: ["新たな勇者、シンブレイバー"],
  npc: veryHardShinBraver(),
};

/** ベリーハードコース ウィングドーザ */
export const VeryHardWingDozer = {
  caption: ["音速の騎士、ウィングドーザ"],
  npc: veryHardWingDozerNPC(),
};

/** ベリーハードコース ネオランドーザ */
export const VeryHardNeoLandozer = {
  caption: ["究極の破壊神、ネオランドーザ"],
  npc: veryHardNeoLandozer(),
};

/** ベリーハードコース ライトニングドーザ */
export const VeryHardLightningDozer = {
  caption: ["不屈の守護神、ライトニングドーザ"],
  npc: veryHardLightningDozer(),
};

/** ベリーハードコース ジェネシスブレイバー */
export const VeryHardGenesisBraver = {
  caption: ["偉大な勇者、Gブレイバー"],
  npc: genesisBraverNPC(),
};

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ["敵よりも大きいバッテリーを出せ"],
  npc: hardNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
