import type {
  Command,
  GameState,
  GBraverBurstCore,
  Player,
  PlayerCommand,
} from "gbraver-burst-core";
import { startGBraverBurst } from "gbraver-burst-core";

import { playerUuid } from "../uuid/player";
import type { NPC } from "./npc";

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
   *
   * @return 取得結果
   */
  stateHistory(): GameState[] {
    return this.#core.stateHistory();
  }

  /**
   * バトルを進める
   *
   * @param command コマンド
   * @return 更新されたステート
   */
  async progress(command: Command): Promise<GameState[]> {
    const playerCommand: PlayerCommand = {
      playerId: this.player.playerId,
      command,
    };
    const enemyCommand: PlayerCommand = {
      playerId: this.enemy.playerId,
      command: this.#npc.routine(
        this.enemy.playerId,
        this.#core.stateHistory(),
      ),
    };
    return this.#core.progress([playerCommand, enemyCommand]);
  }
}
