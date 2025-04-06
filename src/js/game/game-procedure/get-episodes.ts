import { GameProps } from "../game-props";
import { Episodes, EpisodesInDevelopment } from "../story/episodes";
import { Episode } from "../story/episodes/episode";

/**
 * エピソード一覧を取得するヘルパー関数
 * @param props ゲームプロパティ
 * @returns エピソード一覧
 */
export function getEpisodes(props: GameProps): Episode[] {
  return props.canPlayEpisodeInDevelopment ? EpisodesInDevelopment : Episodes;
}
