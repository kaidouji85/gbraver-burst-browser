import { PlayerState } from "gbraver-burst-core"

import { isAllPlayerNoDamage } from "../../is-all-player-no-damage";

/** ゲーム参加プレイヤー */
type Players = {
  /** シンヤ */
  shinya: PlayerState;
  /** ユウヤ */
  yuuya: PlayerState;
};

/**
 * シンヤ、ユウヤがイーブンであるかを判定する
 * @param players ゲーム参加プレイヤー
 * @return イーブンの場合、trueを返す
 */
export function isEvenMatch(players: Players): boolean {
  const { shinya, yuuya } = players;
  return isAllPlayerNoDamage([players.shinya, players.yuuya]) ||
    yuuya.armdozer.hp === shinya.armdozer.hp;
}
