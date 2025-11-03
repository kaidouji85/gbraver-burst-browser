import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { EmptyCustomBattleEvent } from "../../../custom-battle-events/empty-custom-battle-event";
import { lightningDozerNPCForMisunderstanding } from "../../../npc/lightning-dozer-for-misunderstanding";
import { PathIds } from "../../../resource/path/ids";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { playerUuid } from "../../../uuid/player";
import { Episode } from "../episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
export const introduction = `あとで考える`;

/** すれちがい */
export const misunderstanding: Episode = {
  id: EpisodeIDs.MISUNDERSTANDING,
  // 展示用環境で本エピソードが積極的に選択されないようにするため、暫定的に "Side Episode" にしておく
  // 開発が完了したら "Episode" に変更する
  type: "Side Episode",
  number: "X",
  title: "すれちがい",
  isTutorial: false,
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_SURVIVE_SUPER_POWER_WITH_GUARD,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.NEO_LANDOZER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0],
  },
  npc: lightningDozerNPCForMisunderstanding(),
  event: () => new EmptyCustomBattleEvent(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
  isLosingEvent: false,
};
