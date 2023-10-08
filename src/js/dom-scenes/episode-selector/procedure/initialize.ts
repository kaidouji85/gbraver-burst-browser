import { EpisodeSelectorProps } from "../props";
import { setEpisodeDetail } from "./set-episode-detail";

/**
 * 初期化
 * @param props 画面プロパティ
 */
export function initialize(props: Readonly<EpisodeSelectorProps>): void {
  const episode = props.episodeElements.at(0);
  if (!episode) {
    return;
  }

  episode.check();
  setEpisodeDetail(props, episode);
}
