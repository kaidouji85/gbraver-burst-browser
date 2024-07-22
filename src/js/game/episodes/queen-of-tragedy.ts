import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createQueenOfTragedy } from "../../custom-battle-events/queen-of-tragedy";
import { wingDozerNPCForNationalTournamentRevenge } from "../../npc/wing-dozer-for-national-tournament-revenge";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound/ids";
import { playerUuid } from "../../uuid/player";
import { Episode } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `〜Episode4 対決、二人のブレイバー！！ からの続き〜

一年前の全国大会決勝戦、ツバサは惨敗した。例年なら優勝確実と言われていたツバサだったが、G（ジェネシス）ブレイバーは規格外すぎた。それから一年後の今日、ツバサは秘策を携え再びGブレイバーに挑む。`;

/** 悲劇の女王 */
export const QueenOfTragedy: Episode = {
  id: EpisodeIDs.NATIONAL_TOURNAMENT_REVENGE,
  type: "Side Episode",
  number: "4.1",
  title: "悲劇の女王",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_QUEEN_OF_TRAGEDY,
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
