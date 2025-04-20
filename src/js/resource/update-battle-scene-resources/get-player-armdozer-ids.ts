import { ArmdozerId, Player } from "gbraver-burst-core";

/**
 * プレイヤーステートからアームドーザIDを抽出する
 * @param players バトルに参加している全プレイヤー
 * @returns アームドーザID
 */
export const getPlayerArmdozerIds = (
  players: [Player, Player],
): ArmdozerId[] => [...new Set(players.map((p) => p.armdozer.id))];
