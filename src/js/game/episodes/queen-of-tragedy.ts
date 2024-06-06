import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createQueenOfTragedy } from "../../custom-battle-events/queen-of-tragedy";
import { wingDozerNPCForNationalTournamentRevenge } from "../../npc/wing-dozer-for-national-tournament-revenge";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound/ids";
import { playerUuid } from "../../uuid/player";
import { Episode } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `あとで考える`;

/** 悲劇の女王 */
export const QueenOfTragedy: Episode = {
  id: EpisodeIDs.NATIONAL_TOURNAMENT_REVENGE,
  type: "Side Episode",
  number: "4.1",
  title: "（開発中）悲劇の女王",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_PILOT_SKILL_02,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.GENESIS_BRAVER) ??
      Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.YUUYA) ?? Pilots[0],
  },
  npc: wingDozerNPCForNationalTournamentRevenge(),
  event: () => createQueenOfTragedy(),
  bgm: SOUND_IDS.QUEEN_OF_TRAGEDY,
};
