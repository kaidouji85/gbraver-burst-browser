import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBatterySystemTutorialEvent } from "../../custom-battle-events/battery-system-tutorial";
import { createBurstTutorialEvent } from "../../custom-battle-events/burst-tutorial";
import { createPilotSkillTutorialEvent } from "../../custom-battle-events/pilot-skill-tutorial";
import { createZeroDefenseTutorialEvent } from "../../custom-battle-events/zero-defense-tutorial";
import { batterySystemTutorialNPC } from "../../npc/battery-system-tutorial";
import { burstTutorialNPC } from "../../npc/burst-tutorial";
import { pilotSkillTutorialNPC } from "../../npc/pilot-skill-tutorial";
import { zeroDefenseTutorialNPC } from "../../npc/zero-defense-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { TutorialStage } from "./tutorial-stage";
import { TutorialStageIDs } from "./tutorial-stage-ids";

/** シンブレイバー */
const shinBraver =
  ArmDozers.find((v) => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];

/** シンヤ */
const shinya = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];

/** チュートリアルステージを集めたもの */
export const TutorialStages: TutorialStage[] = [
  {
    id: TutorialStageIDs.BATTERY_SYSTEM,
    title: ["バッテリーシステムの基本"],
    player: {
      playerId: playerUuid(),
      armdozer: shinBraver,
      pilot: shinya,
    },
    npc: batterySystemTutorialNPC(),
    event: createBatterySystemTutorialEvent,
    bgm: SOUND_IDS.TUTORIAL_BGM,
  },
  {
    id: TutorialStageIDs.ZERO_DEFENSE,
    title: ["ゼロ防御だと即死する"],
    player: {
      playerId: playerUuid(),
      armdozer: shinBraver,
      pilot: shinya,
    },
    npc: zeroDefenseTutorialNPC(),
    event: createZeroDefenseTutorialEvent,
    bgm: SOUND_IDS.BATTLE_BGM_01,
  },
  {
    id: TutorialStageIDs.BURST,
    title: ["バーストで一発逆転"],
    player: {
      playerId: playerUuid(),
      armdozer: shinBraver,
      pilot: shinya,
    },
    npc: burstTutorialNPC(),
    event: createBurstTutorialEvent,
    bgm: SOUND_IDS.BATTLE_BGM_03,
  },
];

/** 開発中のチュートリアルのステージをあつめたもの */
export const TutorialStagesInDevelopment: TutorialStage[] = [
  ...TutorialStages,
  {
    id: TutorialStageIDs.Pilot,
    title: ["パイロットスキルで意表を突け（前半）"],
    player: {
      playerId: playerUuid(),
      armdozer: shinBraver,
      pilot: shinya,
    },
    npc: pilotSkillTutorialNPC(),
    event: createPilotSkillTutorialEvent,
    bgm: SOUND_IDS.BATTLE_BGM_01,
  },
];
