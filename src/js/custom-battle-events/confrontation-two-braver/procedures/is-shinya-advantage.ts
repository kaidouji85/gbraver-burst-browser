import { PlayerState } from "gbraver-burst-core";

import { isAllPlayerNoDamage } from "../../is-all-player-no-damage";

/** ゲーム参加プレイヤー */
type Players = {
  /** シンヤ */
  shinya: PlayerState;
  /** ユウヤ */
  yuuya: PlayerState;
};

/**
 * シンヤ有利かを判定する
 * @param players ゲーム参加プレイヤー
 * @return シンヤ有利の場合、trueを返す
 */
export function isShinyaAdvantage(players: Players): boolean {
  const { shinya, yuuya } = players;
  return (
    !isAllPlayerNoDamage([shinya, yuuya]) &&
    yuuya.armdozer.hp < shinya.armdozer.hp
  );
}
