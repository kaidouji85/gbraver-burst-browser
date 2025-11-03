import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBatterySystemTutorialEvent } from "../../../custom-battle-events/battery-system-tutorial";
import { batterySystemTutorialNPC } from "../../../npc/battery-system-tutorial";
import { PathIds } from "../../../resource/path/ids";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { playerUuid } from "../../../uuid/player";
import { Episode } from "../episode";
import { EpisodeIDs } from "./episode-ids";

/** イントロダクション */
const introduction = `高校生が巨大ロボットで戦う「機動倶楽部」が実現した、少し未来の物語。大田高校機動倶楽部の新人パイロットであるシンヤは、ツバサ先輩から操縦レクチャーを受けるのであった。`;

/** バッテリーチュートリアル */
export const batterySystemTutorial: Episode = {
  id: EpisodeIDs.BATTERY_SYSTEM,
  type: "Episode",
  number: "1",
  title: "バッテリーシステムの基本",
  isTutorial: true,
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_BATTERY_SYSTEM,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: batterySystemTutorialNPC(),
  event: createBatterySystemTutorialEvent,
  bgm: SOUND_IDS.TUTORIAL_BGM,
  isLosingEvent: false,
};
