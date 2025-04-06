import { GameEnd } from "gbraver-burst-core";

import { Episode } from "./episodes/episode";

/**
 * プレイヤーが勝利したかどうかを判定する
 * @param options オプション
 * @param options.episode エピソード
 * @param options.gameEnd ゲーム終了情報
 * @returns プレイヤーが勝利した場合はtrue、そうでない場合はfalse
 */
export const isPlayerWin = (options: {
  episode: Episode;
  gameEnd: GameEnd;
}) => {
  const { episode, gameEnd } = options;
  return (
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === episode.player.playerId
  );
};
