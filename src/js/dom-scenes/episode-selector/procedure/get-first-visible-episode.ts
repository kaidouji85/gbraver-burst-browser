import { EpisodeSelectorProps } from "../props";

/**
 * 現在表示されているエピソード要素とその詳細を取得する
 * @param props 画面プロパティ
 * @returns 取得結果、見つからない場合はnull
 */
export function getFirstVisibleEpisode(props: Readonly<EpisodeSelectorProps>) {
  const firstVisibleEpisode = props.episodeElements.find((episode) =>
    episode.isVisible(),
  );
  if (!firstVisibleEpisode) {
    return null;
  }

  const firstVisibleEpisodeDetail = props.episodeDetails.find(
    (episodeDetail) => episodeDetail.id === firstVisibleEpisode.id,
  );
  if (!firstVisibleEpisodeDetail) {
    return null;
  }

  return {
    episode: firstVisibleEpisode,
    episodeDetail: firstVisibleEpisodeDetail,
  };
}
