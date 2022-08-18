// @flow

import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import {createTutorialEvent} from "../custom-battle-events/tutorial";
import {oneBatteryWeakWingDozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import type {TutorialStage} from "./tutorial";

const shinBraver = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
const shinya = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];

/** チュートリアルステージをまとめたもの */
const TutorialStages: TutorialStage[] = [
  {
    player: {playerId: playerUuid(), armdozer: shinBraver, pilot: shinya},
    npc: oneBatteryWeakWingDozerNPC(),
    event: createTutorialEvent(playerUuid())
  }
];