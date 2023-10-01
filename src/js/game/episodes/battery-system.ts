import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBatterySystemTutorialEvent } from "../../custom-battle-events/battery-system-tutorial";
import { batterySystemTutorialNPC } from "../../npc/battery-system-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { EpisodeConfig} from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** バッテリーチュートリアル */
export const batterySystemTutorial: EpisodeConfig = {
  id: EpisodeIDs.BATTERY_SYSTEM,
  title: ["バッテリーシステムの基本"],
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: batterySystemTutorialNPC(),
  event: createBatterySystemTutorialEvent,
  bgm: SOUND_IDS.TUTORIAL_BGM,
};
