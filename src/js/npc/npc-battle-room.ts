import {
  Command,
  GameState,
  GBraverBurstCore,
  Player,
  PlayerCommand,
  startGBraverBurst,
} from "gbraver-burst-core";

import { playerUuid } from "../uuid/player";
import { NPC } from "./npc";

/** NPCバトルルーム */
export class NPCBattleRoom {
  player: Player;
  enemy: Player;
  #core: GBraverBurstCore;
  #npc: NPC;

  /**
   * コンストラクタ
   * @param player プレイヤー
   * @param npc NPC
   */
  constructor(player: Player, npc: NPC) {
    this.player = player;
    this.#npc = npc;
    this.enemy = {
      playerId: playerUuid(),
      armdozer: npc.armdozer,
      pilot: npc.pilot,
    };
    this.#core = startGBraverBurst([player, this.enemy]);
  }

  /**
   * ステートヒストリーを取得する
   * @returns 取得結果
   */
  stateHistory(): GameState[] {
    return this.#core.stateHistory();
  }

  /**
   * バトルを進める
   * @param command プレイヤーが入力したコマンド
   * @returns 更新されたステート
   */
  async progress(command: Command): Promise<GameState[]> {
    const playerCommand: PlayerCommand = {
      playerId: this.player.playerId,
      command,
    };
    const enemyCommand: PlayerCommand = {
      playerId: this.enemy.playerId,
      command: this.#npc.routine({
        enemyId: this.enemy.playerId,
        gameStateHistory: this.#core.stateHistory(),
        playerCommand: command,
      }),
    };
    return this.#core.progress([playerCommand, enemyCommand]);
  }
}
