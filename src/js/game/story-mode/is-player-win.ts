import { GameEnd } from "gbraver-burst-core";

import { Episode } from "./episode";

/**
 * プレイヤーが勝利したかどうかを判定する
 * @param options オプション
 * @param options.episode 現在プレイ中のエピソード
 * @param options.gameEnd ゲーム終了情報
 * @returns プレイヤーが勝利した場合はtrue、そうでない場合はfalse
 */
export const isPlayerWin = (options: {
  currentEpisode: Episode;
  gameEnd: GameEnd;
}) => {
  const { currentEpisode, gameEnd } = options;
  return (
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === currentEpisode.player.playerId
  );
};
