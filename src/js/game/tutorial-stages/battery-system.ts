import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBatterySystemTutorialEvent } from "../../custom-battle-events/battery-system-tutorial";
import { batterySystemTutorialNPC } from "../../npc/battery-system-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { TutorialStage } from "./tutorial-stage";
import { TutorialStageIDs } from "./tutorial-stage-ids";

/** バッテリーチュートリアル */
export const batterySystemTutorial: TutorialStage = {
  id: TutorialStageIDs.BATTERY_SYSTEM,
  title: ["バッテリーシステムの基本"],
  player: {
    playerId: playerUuid(),
    armdozer:
      ArmDozers.find((v) => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: batterySystemTutorialNPC(),
  event: createBatterySystemTutorialEvent,
  bgm: SOUND_IDS.TUTORIAL_BGM,
};
