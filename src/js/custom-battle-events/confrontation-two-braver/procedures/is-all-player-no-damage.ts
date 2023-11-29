import { GameState } from "gbraver-burst-core";

/**
 * すべてのプレイヤーがノーダメージであるかを判定する
 * @param lastState 最新のゲームステート
 * @return 判定結果、すべてのプレイヤーがノーダメージである場合true
 */
export function isAllPlayerNoDamage(
  lastState: Readonly<GameState>
): boolean {
  return lastState.players
    .map(player => player.armdozer.maxHp === player.armdozer.hp)
    .reduce((a, b) => a && b, true);
}
