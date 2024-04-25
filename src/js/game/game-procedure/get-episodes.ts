import { Episodes, EpisodesInDevelopment } from "../episodes";
import { Episode } from "../episodes/episode";
import { GameProps } from "../game-props";

/**
 * エピソード一覧を取得するヘルパー関数
 * @param props ゲームプロパティ
 * @returns エピソード一覧
 */
export function getEpisodes(props: GameProps): Episode[] {
  return props.canPlayEpisodeInDevelopment ? EpisodesInDevelopment : Episodes;
}
