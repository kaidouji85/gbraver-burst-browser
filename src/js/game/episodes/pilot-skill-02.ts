import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createPilotSkillTutorial02Event } from "../../custom-battle-events/pilot-skill-tutorial-02";
import { pilotSkillTutorialNPC } from "../../npc/pilot-skill-tutorial";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { EpisodeConfig } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** パイロットスキルチュートリアル（後半） */
export const pilotSkillTutorial02: EpisodeConfig = {
  id: EpisodeIDs.Pilot02,
  title: "パイロットスキルで意表を突け",
  introduction: "", // TODO ちゃんと書く
  imageCutPathId: PathIds.IMAGE_CUT_BATTERY_SYSTEM, // TODO 正しい画像を指定する
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0],
  },
  npc: pilotSkillTutorialNPC(),
  event: createPilotSkillTutorial02Event,
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
