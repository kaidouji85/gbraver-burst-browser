// @flow
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import {createBatterySystemTutorialEvent} from "../custom-battle-events/battery-system-tutorial";
import {createBurstTutorialEvent} from "../custom-battle-events/burst-tutorial";
import {createZeroDefenseTutorialEvent} from "../custom-battle-events/zero-defense-tutorial";
import {batterySystemTutorialNPC} from "../npc/battery-system-tutorial";
import {burstTutorialNPC} from "../npc/burst-tutorial";
import {zeroDefenseTutorialNPC} from "../npc/zero-defense-tutorial";
import {SOUND_IDS} from "../resource/sound";
import {playerUuid} from "../uuid/player";
import type {TutorialStage} from "./tutorial";

/** チュートリアルIDを集めたもの */
export const TutorialStageIDs = {
  BATTERY_SYSTEM: 'BATTERY_SYSTEM',
  ZERO_DEFENSE: 'ZERO_DEFENSE',
  BURST: 'BURST'
};

/** シンブレイバー */
const shinBraver = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
/** シンヤ */
const shinya = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];

/** バッテリーシステムチュートリアル */
const batterySystemTutorial =   {
  id: TutorialStageIDs.BATTERY_SYSTEM,
  title: ['バッテリーシステムの基本'],
  player: {playerId: playerUuid(), armdozer: shinBraver, pilot: shinya},
  npc: batterySystemTutorialNPC(),
  event: createBatterySystemTutorialEvent,
  bgm: SOUND_IDS.TUTORIAL_BGM,
};

/** 0防御チュートリアル */
const zeroDefenseTutorial =   {
  id: TutorialStageIDs.ZERO_DEFENSE,
  title: ['ゼロ防御だと即', '死する'],
  player: {playerId: playerUuid(), armdozer: shinBraver, pilot: shinya},
  npc: zeroDefenseTutorialNPC(),
  event: createZeroDefenseTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** バーストチュートリアル */
const burstTutorial = {
  id: TutorialStageIDs.BURST,
  title: ['バーストで', 'バッテリー回復'],
  player: {playerId: playerUuid(), armdozer: shinBraver, pilot: shinya},
  npc: burstTutorialNPC(),
  event: createBurstTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** チュートリアルのステージ */
export const TutorialStages: TutorialStage[] = [batterySystemTutorial, zeroDefenseTutorial, burstTutorial];

/** 開発中のチュートリアルのステージ */
export const TutorialStagesInDevelopment: TutorialStage[] = TutorialStages;