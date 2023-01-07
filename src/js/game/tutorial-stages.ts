import type { Player } from "gbraver-burst-core";
import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";
import { createBatterySystemTutorialEvent } from "../custom-battle-events/battery-system-tutorial";
import { createBurstTutorialEvent } from "../custom-battle-events/burst-tutorial";
import { createZeroDefenseTutorialEvent } from "../custom-battle-events/zero-defense-tutorial";
import { batterySystemTutorialNPC } from "../npc/battery-system-tutorial";
import { burstTutorialNPC } from "../npc/burst-tutorial";
import type { NPC } from "../npc/npc";
import { zeroDefenseTutorialNPC } from "../npc/zero-defense-tutorial";
import type { SoundId } from "../resource/sound";
import { SOUND_IDS } from "../resource/sound";
import type { CustomBattleEvent } from "../td-scenes/battle/custom-battle-event";
import { playerUuid } from "../uuid/player";

/** チュートリアルステージID */
export type TutorialStageID = string;

/** チュートリアルIDを集めたもの */
export const TutorialStageIDs = {
  BATTERY_SYSTEM: "BATTERY_SYSTEM",
  ZERO_DEFENSE: "ZERO_DEFENSE",
  BURST: "BURST"
};

/** チュートリアルステージ */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID;

  /** チュートリアルタイトル */
  title: string[];

  /** カスタムバトルイベント生成関数、カスタムバトルイベントは状態を持つので都度生成する */
  event: () => CustomBattleEvent;

  /** NPC */
  npc: NPC;

  /** プレイヤー */
  player: Player;

  /** 再生するBGMのID */
  bgm: SoundId;
};

/** シンブレイバー */
const shinBraver = ArmDozers.find(v => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];

/** シンヤ */
const shinya = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];

/** チュートリアルステージを集めたもの */
export const TutorialStages: TutorialStage[] = [{
  id: TutorialStageIDs.BATTERY_SYSTEM,
  title: ["バッテリーシステムの基本"],
  player: {
    playerId: playerUuid(),
    armdozer: shinBraver,
    pilot: shinya
  },
  npc: batterySystemTutorialNPC(),
  event: createBatterySystemTutorialEvent,
  bgm: SOUND_IDS.TUTORIAL_BGM
}, {
  id: TutorialStageIDs.ZERO_DEFENSE,
  title: ["ゼロ防御だと即", "死する"],
  player: {
    playerId: playerUuid(),
    armdozer: shinBraver,
    pilot: shinya
  },
  npc: zeroDefenseTutorialNPC(),
  event: createZeroDefenseTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_01
}, {
  id: TutorialStageIDs.BURST,
  title: ["バーストで一発", "逆転"],
  player: {
    playerId: playerUuid(),
    armdozer: shinBraver,
    pilot: shinya
  },
  npc: burstTutorialNPC(),
  event: createBurstTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_03
}];

/** 開発中のチュートリアルのステージをあつめたもの */
export const TutorialStagesInDevelopment: TutorialStage[] = TutorialStages;