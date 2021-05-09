// @flow
import type {Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {GbraverBurstCore} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {BattleRoom} from "./battle-room";

/**
 * オフラインのバトルルーム
 */
export class OfflineBattleRoom implements BattleRoom {
  player: Player;
  enemy: Player;

  _npc: NPC;
  _stateHistory: GameState[];
  _gbraverBurstCore: GbraverBurstCore;

  /**
   * コンストラクタ
   *
   * @param player プレイヤー情報
   * @param npc NPC
   */
  constructor(player: Player, npc: NPC) {
    this.player = player;
    this._npc = npc;
    this.enemy = {
      playerId: `enemy-of-${player.playerId}`,
      armdozer: this._npc.armdozer,
      pilot: this._npc.pilot,
    };
    this._stateHistory = [];
    this._gbraverBurstCore = new GbraverBurstCore();
  }

  /**
   * 戦闘を開始する
   *
   * @return 初期状態
   */
  start(): GameState[] {
    this._stateHistory = this._gbraverBurstCore.start(this.player, this.enemy);
    return this._stateHistory
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