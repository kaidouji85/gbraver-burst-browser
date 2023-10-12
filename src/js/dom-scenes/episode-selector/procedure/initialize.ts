import { EpisodeType } from "../../../game/episodes/episode";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisode } from "./get-first-visible-episode";
import { setEpisodeDetail } from "./set-episode-detail";
import { setEpisodeTab } from "./set-episode-tab";
import { setEpisodesVisible } from "./set-episodes-visible";

/**
 * 初期化
 * @param props 画面プロパティ
 */
export function initialize(props: Readonly<EpisodeSelectorProps>): void {
  const episodeType: EpisodeType = "Episode";
  setEpisodeTab(props, episodeType);
  setEpisodesVisible(props, episodeType);
  const firstVisible = getFirstVisibleEpisode(props);
  if (!firstVisible) {
    return;
  }

  firstVisible.episode.checked(true);
  setEpisodeDetail(props, firstVisible.episodeDetail);
}
