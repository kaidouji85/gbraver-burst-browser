// @flow

import type {GbraverBurstCore, Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {startGbraverBurst} from "gbraver-burst-core";
import type {NPC} from "./npc";
import type {BattleProgress} from "../game/td-scenes/battle/battle-progress";
import {playerUuid} from "../uuid/player";

/** NPCバトルルーム */
export class NPCBattleRoom implements BattleProgress {
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

  /** @override */
  async progress(command: Command): Promise<GameState[]> {
    const playerCommand: PlayerCommand = {playerId: this.player.playerId, command};
    const enemyCommand: PlayerCommand = {
      playerId: this.enemy.playerId,
      command: this._npc.routine(this.enemy.playerId, this._core.stateHistory())
    };
    return this._core.progress([playerCommand, enemyCommand]);
  }
}