// @flow

import type {GbraverBurstCore, Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {startGbraverBurst} from "gbraver-burst-core";
import type {NPC} from "./npc";
import {playerUuid} from "../uuid/player";

/** NPCバトルルーム */
export class NPCBattleRoom {
  player: Player;
  enemy: Player;
  _core: GbraverBurstCore;
  _npc: NPC;

  /**
   * コンストラクタ
   *
   * @param player プレイヤー
   * @param npc NPC
   */
  constructor(player: Player, npc: NPC) {
    this.player = player;
    this._npc = npc;
    this.enemy = { playerId: playerUuid(), armdozer: npc.armdozer, pilot: npc.pilot,};
    this._core = startGbraverBurst([player, this.enemy]);
  }

  /**
   * ステートヒストリーを取得する
   *
   * @return 取得結果
   */
  stateHistory(): GameState[] {
    return this._core.stateHistory();
  }

  /**
   * バトルを進める
   *
   * @param command コマンド
   * @return 更新されたステート
   */
  async progress(command: Command): Promise<GameState[]> {
    const playerCommand: PlayerCommand = {playerId: this.player.playerId, command};
    const enemyCommand: PlayerCommand = {
      playerId: this.enemy.playerId,
      command: this._npc.routine(this.enemy.playerId, this._core.stateHistory())
    };
    return this._core.progress([playerCommand, enemyCommand]);
  }
}