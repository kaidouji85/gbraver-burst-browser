import { Episode } from "./episodes/episode";

/**
 * 次のエピソードを取得する
 * @param options オプション
 * @param options.currentEpisode 現在のエピソード
 * @param options.episodes エピソード一覧
 * @returns 次のエピソード、なければnull
 */
export const getNextEpisode = (options: {
  currentEpisode: Episode;
  episodes: Episode[];
}) => {
  const { currentEpisode, episodes } = options;
  const sameTypeEpisodes = episodes.filter(
    (e) => e.type === currentEpisode.type,
  );
  const currentEpisodeIndex = sameTypeEpisodes.indexOf(currentEpisode);
  return sameTypeEpisodes.at(currentEpisodeIndex + 1) ?? null;
};
