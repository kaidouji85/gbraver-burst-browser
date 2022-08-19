// @flow
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import {EmptyCustomBattleEvent} from "../custom-battle-events/empty-custom-battle-event";
import {createTutorialEvent} from "../custom-battle-events/tutorial";
import {oneBatteryWeakWingDozerNPC} from "../npc/one-battery";
import {zeroDefenseTutorialNPC} from "../npc/zero-defense-tutorial";
import {playerUuid} from "../uuid/player";
import type {TutorialStage} from "./tutorial";

const shinBraver = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
const shinya = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
const playerId = playerUuid();

/** チュートリアルステージのマスタデータ */
export const TutorialStagesMaster: TutorialStage[] = [
  // TODO 開発が終わったら0防御チュートリアルを消す
  {
    player: {playerId, armdozer: shinBraver, pilot: shinya},
    npc: zeroDefenseTutorialNPC(),
    event: () => new EmptyCustomBattleEvent()
  },
  {
    player: {playerId, armdozer: shinBraver, pilot: shinya},
    npc: oneBatteryWeakWingDozerNPC(),
    event: () => createTutorialEvent(playerId)
  },
];