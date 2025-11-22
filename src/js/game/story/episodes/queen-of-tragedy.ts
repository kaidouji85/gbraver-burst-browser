import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createQueenOfTragedy } from "../../../custom-battle-events/queen-of-tragedy";
import { wingDozerNPCForQueenOfTragedy } from "../../../npc/wing-dozer-for-queen-of-tragedy";
import { PathIds } from "../../../resource/path/ids";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { playerUuid } from "../../../uuid/player";
import { Episode } from "../episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `（Episode6. 対決、二人のブレイバー！！ からの続き）
一年前の全国大会決勝戦、ツバサは優勝確実と言われていたがGブレイバーに惨敗してしまった。いつしか彼女は悲劇の女王と呼ばれるようになったが、今日こそ汚名返上できるのだろうか。`;

/** 悲劇の女王 */
export const QueenOfTragedy: Episode = {
  id: EpisodeIDs.QUEEN_OF_TRAGEDY,
  type: "Side Episode",
  number: "6.1",
  title: "悲劇の女王",
  isTutorial: false,
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_QUEEN_OF_TRAGEDY,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.GENESIS_BRAVER) ??
      Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.YUUYA) ?? Pilots[0],
  },
  npc: wingDozerNPCForQueenOfTragedy(),
  event: () => createQueenOfTragedy(),
  bgm: SOUND_IDS.QUEEN_OF_TRAGEDY,
  isLosingEvent: false,
};
