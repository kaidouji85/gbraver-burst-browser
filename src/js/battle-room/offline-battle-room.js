// @flow
import type {Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {GbraverBurstCore} from "gbraver-burst-core";
import type {NPC, NPCRoutine} from "../npc/npc";
import type {BattleRoom, InitialState} from "./battle-room";

/**
 * オフラインのバトルルーム
 */
export class OfflineBattleRoom implements BattleRoom {
  _player: Player;
  _enemy: Player;
  _npc: NPC;
  _stateHistory: GameState[];
  _gbraverBurstCore: GbraverBurstCore;

  constructor(player: Player, npc: NPC) {
    this._player = player;
    this._npc = npc;
    this._enemy = {
      playerId: `enemy-of-${player.playerId}`,
      armdozer: this._npc.armdozer
    };
    this._stateHistory = [];
    this._gbraverBurstCore = new GbraverBurstCore();
  }

  /**
   * 戦闘開始
   *
   * @return 初期状態
   */
  async start(): Promise<InitialState> {
    try {
      this._stateHistory = this._gbraverBurstCore.start(this._player, this._enemy);
      return {
        playerId: this._player.playerId,
        players: [this._player, this._enemy],
        stateHistory: this._stateHistory
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * 戦闘を進める
   *
   * @param command 各プレイヤーのコマンド
   * @return ステートヒストリー
   */
  async progress(command: Command): Promise<GameState[]> {
    try {
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
        command: this._npc.routine(this._enemy.playerId, this._stateHistory)
      };
      const updateState = this._gbraverBurstCore.progress(lastState, [playerCommand, enemyCommand]);
      this._stateHistory = [...this._stateHistory, ...updateState];
      return updateState;
    } catch (e) {
      throw e;
    }
  }
}