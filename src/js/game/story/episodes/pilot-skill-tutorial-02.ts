import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createPilotSkillTutorial02Event } from "../../../custom-battle-events/pilot-skill-tutorial-02";
import { pilotSkillTutorialNPC } from "../../../npc/pilot-skill-tutorial";
import { PathIds } from "../../../resource/path/ids";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { playerUuid } from "../../../uuid/player";
import { Episode } from "../episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `なぜか大田高校と合同練習することになったガイ。あのシンヤも勝てなかったツバサ先輩に、ガイは勝利することはできるのだろうか……。`;

/** パイロットスキルチュートリアル（後半） */
export const pilotSkillTutorial02: Episode = {
  id: EpisodeIDs.PILOT_02,
  type: "Episode",
  number: "5",
  title: "パイロットスキルで意表を突け",
  isTutorial: true,
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_PILOT_SKILL_02,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0],
  },
  npc: pilotSkillTutorialNPC(),
  event: createPilotSkillTutorial02Event,
  bgm: SOUND_IDS.GAI_BATTLE,
  isLosingEvent: false,
};
