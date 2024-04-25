import { PlayerState } from "gbraver-burst-core";

import { isAllPlayerNoDamage } from "./is-all-player-no-damage";

/** ゲーム参加プレイヤー */
type Players = {
  /** プレイヤー */
  player: PlayerState;
  /** 敵 */
  enemy: PlayerState;
};

/**
 * プレイヤー、敵がイーブンであるかを判定する
 * @param players ゲーム参加プレイヤー
 * @returns イーブンの場合、trueを返す
 */
export function isEvenMatch(players: Players): boolean {
  const { player, enemy } = players;
  return (
    isAllPlayerNoDamage([player, enemy]) ||
    enemy.armdozer.hp === player.armdozer.hp
  );
}
