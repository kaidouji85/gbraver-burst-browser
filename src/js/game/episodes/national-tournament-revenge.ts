import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { EmptyCustomBattleEvent } from "../../custom-battle-events/empty-custom-battle-event";
import { wingDozerNPCForNationalTournamentRevenge } from "../../npc/wing-dozer-for-national-tournament-revenge";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { Episode } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `あとで考える`;

/** 全国大会のリベンジ */
export const nationalTournamentRevenge: Episode = {
  id: EpisodeIDs.NATIONAL_TOURNAMENT_REVENGE,
  type: "Side Episode",
  number: "4.1",
  title: "（開発中）全国大会のリベンジ",
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
  event: () => new EmptyCustomBattleEvent(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
