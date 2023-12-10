import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createConfrontationTwoBraverEvent } from "../../custom-battle-events/confrontation-two-braver";
import { genesisBraverNPC } from "../../npc/genesis-braver";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { EpisodeConfig } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `デビュー戦から数日後、シンヤのもとに 全国大会の覇者ユウヤから対戦申し込みが入った。憧れの人と対戦できることに、心躍らせるシンヤであったが……。`;

/** 対決、二人のブレイバー！！ */
export const confrontationTwoBraver: EpisodeConfig = {
  id: EpisodeIDs.TWO_BRAVER,
  title: "対決、二人のブレイバー！！（負けイベント）",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_CONFRONTATION_TWO_BRAVER,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: genesisBraverNPC(),
  event: () => createConfrontationTwoBraverEvent(),
  bgm: SOUND_IDS.YUUYA_BATTLE,
};
