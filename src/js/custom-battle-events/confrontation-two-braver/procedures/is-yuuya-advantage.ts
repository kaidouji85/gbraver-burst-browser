import { PlayerState } from "gbraver-burst-core"

/** ゲーム参加プレイヤー */
type Players = {
  /** シンヤ */
  shinya: PlayerState;
  /** ユウヤ */
  yuuya: PlayerState;
};

/**
 * ユウヤ有利かを判定する
 * @param players ゲーム参加プレイヤー
 * @return ユウヤ有利の場合、trueを返す
 */
export function isYuuyaAdvantage(players: Players): boolean {
  const { shinya, yuuya } = players;
  return  shinya.armdozer.hp < yuuya.armdozer.hp;
}
