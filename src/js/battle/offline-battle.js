// @flow

import type {Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {GbraverBurstCore} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import type {BattleProgress} from "./battle-progress";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";

/** オフラインバトル */
export type OfflineBattle = {
  player: Player,
  enemy: Player,
  initialState: GameState[],
  progress: BattleProgress,
};

/**
 * オフラインバトルを開始する
 *
 * @param player プレイヤー情報
 * @param npc NPC
 * @return オフラインバトル
 */
export function startOfflineBattle(player: Player, npc: NPC): OfflineBattle {
  const enemy = {
    playerId: `enemy-of-${player.playerId}`,
    armdozer: npc.armdozer,
    pilot: npc.pilot,
  };
  const core = new GbraverBurstCore([player, enemy]);
  const initialState = core.stateHistory();
  const progress = new OfflineBattleProgress(player.playerId, enemy.playerId, core, npc);
  return {player, enemy, initialState, progress};
}

/** オフライン バトル進行 */
export class OfflineBattleProgress implements BattleProgress {
  _playerId: PlayerId;
  _enemyId: PlayerId;
  _npc: NPC;
  _core: GbraverBurstCore;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤー情報
   * @param enemyId 敵情報
   * @param core ゲームコア
   * @param npc NPC
   */
  constructor(playerId: PlayerId, enemyId: PlayerId, core: GbraverBurstCore, npc: NPC) {
    this._npc = npc;
    this._core = core;
    this._playerId = playerId;
    this._enemyId = enemyId;
  }

  /**
   * 戦闘を進める
   *
   * @param command 各プレイヤーのコマンド
   * @return ステートヒストリー
   */
  async progress(command: Command): Promise<GameState[]> {
    const playerCommand: PlayerCommand = {
      playerId: this._playerId,
      command: command
    };
    const enemyCommand: PlayerCommand = {
      playerId: this._enemyId,
      command: this._npc.routine(this._enemyId, this._core.stateHistory())
    };
    return this._core.progress([playerCommand, enemyCommand]);
  }
}