// @flow
import type {Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {GbraverBurstCore} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {BattleProgress} from "./battle-room";

/**
 * オフラインのバトルルーム
 */
export class OfflineBattleRoom implements BattleProgress {
  player: Player;
  enemy: Player;
  initialState: GameState[];
  _stateHistory: GameState[];
  _npc: NPC;
  _gbraverBurstCore: GbraverBurstCore;

  /**
   * コンストラクタ
   *
   * @param player プレイヤー情報
   * @param npc NPC
   */
  constructor(player: Player, npc: NPC) {
    this._npc = npc;
    this._gbraverBurstCore = new GbraverBurstCore();

    this.player = player;
    this.enemy = {
      playerId: `enemy-of-${player.playerId}`,
      armdozer: npc.armdozer,
      pilot: npc.pilot,
    };
    this.initialState = this._gbraverBurstCore.start(this.player, this.enemy);
    this._stateHistory = this.initialState;
  }

  /**
   * 戦闘を進める
   *
   * @param command 各プレイヤーのコマンド
   * @return ステートヒストリー
   */
  async progress(command: Command): Promise<GameState[]> {
    if (this._stateHistory.length <= 0) {
      return [];
    }

    const lastState = this._stateHistory[this._stateHistory.length - 1];
    const playerCommand: PlayerCommand = {
      playerId: this.player.playerId,
      command: command
    };
    const enemyCommand: PlayerCommand = {
      playerId: this.enemy.playerId,
      command: this._npc.routine(this.enemy.playerId, this._stateHistory)
    };
    const updateState = this._gbraverBurstCore.progress(lastState, [playerCommand, enemyCommand]);
    this._stateHistory = [...this._stateHistory, ...updateState];
    return updateState;
  }
}