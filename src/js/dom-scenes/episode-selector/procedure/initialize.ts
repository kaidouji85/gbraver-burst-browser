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

  const episodeDetail = props.episodeDetails.find((v) => v.id === episode.id);
  if (!episodeDetail) {
    return;
  }

  episode.check();
  setEpisodeDetail(props, episodeDetail);
}
