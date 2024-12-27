import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createPilotSkillTutorial01Event } from "../../custom-battle-events/pilot-skill-tutorial-01";
import { pilotSkillTutorialNPC } from "../../npc/pilot-skill-tutorial";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound/ids";
import { playerUuid } from "../../uuid/player";
import { Episode } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `（Episode3. バーストで一発逆転 からの続き）
新人戦を終え練習に励む大田高校、その様子を密かに見つめる人物がいるようだが……。`;

/** パイロットスキルチュートリアル（前半） */
export const pilotSkillTutorial01: Episode = {
  id: EpisodeIDs.Pilot01,
  type: "Side Episode",
  number: "3.1",
  title: "パイロット次第では詰み （負けイベント）",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_PILOT_SKILL_01,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: pilotSkillTutorialNPC(),
  event: createPilotSkillTutorial01Event,
  bgm: SOUND_IDS.BATTLE_BGM_01,
  isLosingEvent: true,
};
