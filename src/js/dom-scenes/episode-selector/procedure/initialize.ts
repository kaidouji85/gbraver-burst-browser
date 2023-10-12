import { EpisodeType } from "../../../game/episodes/episode";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisodeAndDetail } from "./get-first-visible-episode-and-detail";
import { setEpisodeDetail } from "./set-episode-detail";
import { setEpisodesVisible } from "./set-episodes-visible";
import { switchEpisodeTab } from "./switch-episode-tab";

/**
 * 初期化
 * @param props 画面プロパティ
 */
export function initialize(props: Readonly<EpisodeSelectorProps>): void {
  const episodeType: EpisodeType = "Episode";
  switchEpisodeTab(props, episodeType);
  setEpisodesVisible(props, episodeType);
  const firstVisible = getFirstVisibleEpisodeAndDetail(props);
  if (!firstVisible) {
    return;
  }

  firstVisible.episode.checked(true);
  setEpisodeDetail(props, firstVisible.episodeDetail);
}
