import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createQueenOfTragedy } from "../../custom-battle-events/queen-of-tragedy";
import { wingDozerNPCForQueenOfTragedy } from "../../npc/wing-dozer-for-queen-of-tragedy";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound/ids";
import { playerUuid } from "../../uuid/player";
import { Episode } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `あとで考える`;

/** 落日の王子 */
export const PrinceOfFallenSun: Episode = {
  id: EpisodeIDs.PRINCE_OF_FALLEN_SUN,
  type: "Side Episode",
  number: "4.2",
  title: "落日の王子",
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
};
