import { Player, PlayerId } from "gbraver-burst-core";

/**
 * プレイヤーステートからパイロットIDを抽出する
 * @param players バトルに参加している全プレイヤー
 * @returns 抽出したパイロットID
 */
export const getPlayerPilotIds = (players: [Player, Player]): PlayerId[] => [
  ...new Set(players.map((p) => p.pilot.id)),
];
