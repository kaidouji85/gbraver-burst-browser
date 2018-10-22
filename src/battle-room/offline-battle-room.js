// @flow
import type {BattleRoom} from "../scene/battle/progress-battle/progress-battle";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Command} from "gbraver-burst-core/lib/command/command";
import type {NPC, NPCRoutine} from "../npc/npc";
import {progress, start} from 'gbraver-burst-core';
import type {Player} from "gbraver-burst-core/lib/player/player";
import type {PlayerCommand} from "gbraver-burst-core/lib/command/player-command";

export class OfflineBattleRoom implements BattleRoom{
  player: Player;
  enemy: Player;
  routine: NPCRoutine;
  stateHistory: GameState[];

  constructor(player: Player, npc: NPC) {
    this.player = player;
    this.enemy = {
      playerId: `enemy-of-${player.playerId}`,
      armdozer: npc.armdozer
    };
    this.routine = npc.routine;
    this.stateHistory = start(this.player, this.enemy);
  }

  /** 戦闘を進める */
  async progress(command: Command): Promise<GameState[]> {
    if (this.stateHistory.length <= 0) {
      return [];
    }

    const lastState = this.stateHistory[this.stateHistory.length - 1];
    const playerCommand: PlayerCommand = {
      playerId: this.player.playerId,
      command: command
    };
    const enemyCommand: PlayerCommand = {
      playerId: this.enemy.playerId,
      command: this.routine(this.enemy.playerId, this.stateHistory)
    };
    const updateState = progress(lastState, [playerCommand, enemyCommand]);
    this.stateHistory = [...this.stateHistory, ...updateState];
    return updateState;
  }
}