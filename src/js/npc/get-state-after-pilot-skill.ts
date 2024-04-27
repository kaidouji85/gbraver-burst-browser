import { EMPTY_GAME_STATE, pilotSkill, PlayerState } from "gbraver-burst-core";

/** ゲーム参加プレイヤー */
type Players = {
  /** パイロットスキル発動プレイヤー */
  invoker: PlayerState;
  /** それ以外のプレイヤー */
  other: PlayerState;
};

/**
 * パイロットスキル発動後のプレイヤーステートを取得する
 * @param players ゲーム参加プレイヤー
 * @returns バースト発動後のプレイヤーステート
 */
export function getStateAfterPilotSkill(players: Players): Players {
  const { invoker, other } = players;
  const gameState = {
    ...EMPTY_GAME_STATE,
    players: [invoker, other],
  };
  const update = pilotSkill(gameState, invoker.playerId);
  return {
    invoker:
      update.players.find((v) => v.playerId === invoker.playerId) ?? invoker,
    other: update.players.find((v) => v.playerId === other.playerId) ?? other,
  };
}
