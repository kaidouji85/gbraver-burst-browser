import { Episode } from "./episode";

/**
 * 次のチュートリアルを取得する
 * @param options オプション
 * @param options.currentEpisode 現在のエピソード
 * @param options.episodes エピソード一覧
 * @returns 次のチュートリアル、なければnull
 */
export const getNextTutorial = (options: {
  currentEpisode: Episode;
  episodes: Episode[];
}) => {
  const { currentEpisode, episodes } = options;
  const tutorials = episodes.filter((e) => e.isTutorial);
  const currentEpisodeIndex = tutorials.findIndex(
    (e) => e.id === currentEpisode.id,
  );
  return tutorials.at(currentEpisodeIndex + 1) ?? null;
};
