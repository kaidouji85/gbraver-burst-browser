import { PlayerState } from "gbraver-burst-core";

/**
 * すべてのプレイヤーがノーダメージであるかを判定する
 * @param players ゲームに参加しているプレイヤー
 * @return 判定結果、すべてのプレイヤーがノーダメージである場合true
 */
export function isAllPlayerNoDamage(
  players: Readonly<[PlayerState, PlayerState]>,
): boolean {
  return players
    .map((player) => player.armdozer.maxHp === player.armdozer.hp)
    .reduce((a, b) => a && b, true);
}
