// @flow
import type {BattleRoom} from "../scene/battle/progress-battle/progress-battle";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Command} from "gbraver-burst-core/lib/command/command";
import type {NPCRoutine} from "../npc/npc";
import {progress, start} from 'gbraver-burst-core';
import type {Player} from "gbraver-burst-core/lib/player/player";
import type {PlayerCommand} from "gbraver-burst-core/lib/command/player-command";

export class OfflineBattleRoom {
  _player: Player;
  _enemy: Player;
  _routine: NPCRoutine;
  _stateHistory: GameState[];

  constructor(player: Player, enemy: Player, routine: NPCRoutine) {
    this._player = player;
    this._enemy = enemy;
    this._routine = routine;
    this._stateHistory = [];
  }

  start(): GameState[] {
    const initialState = start(this._player, this._enemy);
    this._stateHistory = initialState;
    return initialState;
  }


  progress(command: Command): GameState[] {
    if (this._stateHistory.length <= 0) {
      return [];
    }

    const lastState = this._stateHistory[this._stateHistory.length - 1];
    const playerCommand: PlayerCommand = {
      playerId: this._player.playerId,
      command: command
    };
    const enemyCommand: PlayerCommand = {
      playerId: this._enemy.playerId,
      command: this._routine(this._enemy.playerId, this._stateHistory)
    };
    const updateState = progress(lastState, [playerCommand, enemyCommand]);
    this._stateHistory = [...this._stateHistory, ...updateState];
    return updateState;
  }
}