import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBurstTutorialEvent } from "../../custom-battle-events/burst-tutorial";
import { genesisBraverNPC } from "../../npc/genesis-braver";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { EpisodeConfig } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `あとで考える`;

/** 対決、二人のブレイバー！！ */
export const confrontationTwoBraver: EpisodeConfig = {
  id: EpisodeIDs.TWO_BRAVER,
  title: "対決、二人のブレイバー！！",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_BURST,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: genesisBraverNPC(),
  event: createBurstTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_03,
};
