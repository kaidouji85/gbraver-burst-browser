// @flow

import type {Command, GameState, Player, PlayerCommand} from "gbraver-burst-core";
import {GbraverBurstCore} from "gbraver-burst-core";
import type {NPC} from "./npc";
import type {BattleProgress} from "../game/td-scenes/battle/battle-progress";

/** NPCバトルルーム */
export class NPCBattleRoom implements BattleProgress {
  player: Player;
  enemy: Player;
  initialState: GameState[];
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
    this.enemy = { playerId: `enemy-of-${player.playerId}`, armdozer: npc.armdozer, pilot: npc.pilot,};
    this._core = new GbraverBurstCore([player, this.enemy]);
    this.initialState = this._core.stateHistory();
  }

  /**
   * 戦闘を進める
   *
   * @param command プレイヤーが入力したコマンド
   * @return ステートヒストリー
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