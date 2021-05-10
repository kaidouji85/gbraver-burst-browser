// @flow
import type {Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {GbraverBurstCore} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {BattleProgress} from "./battle-progress";

/** オフライン バトルルーム */
export type OfflineBattleRoom = {
  player: Player,
  enemy: Player,
  initialState: GameState[],
  progress: BattleProgress,
};

/**
 * オフラインバトルルームを開始する
 *
 * @param player プレイヤー情報
 * @param npc NPC
 * @return オフラインバトルルーム
 */
export function startOfflineBattleRoom(player: Player, npc: NPC): OfflineBattleRoom {
  const enemy = {
    playerId: `enemy-of-${player.playerId}`,
    armdozer: npc.armdozer,
    pilot: npc.pilot,
  };
  const initialState = new GbraverBurstCore().start(player, enemy);
  const progress = new OfflineBattleProgress(player, enemy, initialState, npc,);

  return {player, enemy, initialState, progress};
}

/** オフライン バトル進行 */
export class OfflineBattleProgress implements BattleProgress {
  _player: Player;
  _enemy: Player;
  _stateHistory: GameState[];
  _npc: NPC;
  _gbraverBurstCore: GbraverBurstCore;

  /**
   * コンストラクタ
   *
   * @param player プレイヤー情報
   * @param enemy 敵情報
   * @param initialState 初期ゲームステート
   * @param npc NPC
   */
  constructor(player: Player, enemy: Player, initialState: GameState[], npc: NPC) {
    this._npc = npc;
    this._gbraverBurstCore = new GbraverBurstCore();
    this._player = player;
    this._enemy = enemy;
    this._stateHistory = initialState;
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
  }
}