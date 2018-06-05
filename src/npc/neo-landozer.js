// @flow

import type {NPC} from "./npc";
import {ArmDozers, ArmDozerIdList} from "gbraver-burst-core";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Command} from "gbraver-burst-core/lib/command/command";

/** ネオランドーザ NPC */
export const NeoLandozer: NPC = {
  armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0],
  routine(enemyId: PlayerId, gameStateHistory: GameState[]): Command {
    return {
      type: 'BATTERY_COMMAND',
      battery: 0
    };
  }
};