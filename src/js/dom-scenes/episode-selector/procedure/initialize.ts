import { EpisodeID } from "../../../game/story/episodes/episode";
import { EpisodeSelectorProps } from "../props";
import { selectEpisodeElement } from "./select-episode";
import { setEpisodeDetail } from "./set-episode-detail";
import { setEpisodesVisible } from "./set-episodes-visible";
import { switchEpisodeTab } from "./switch-episode-tab";

/**
 * 初期化
 * @param props 画面プロパティ
 * @param initialSelectedEpisodeID 初期選択エピソードID
 */
export function initialize(
  props: Readonly<EpisodeSelectorProps>,
  initialSelectedEpisodeID?: EpisodeID,
): void {
  const episode = initialSelectedEpisodeID
    ? props.episodeElements.find(
        (episode) => episode.id === initialSelectedEpisodeID,
      )
    : props.episodeElements.at(0);
  if (!episode) {
    return;
  }

  selectEpisodeElement(props, episode.id);
  switchEpisodeTab(props, episode.type);
  setEpisodesVisible(props, episode.type);
  const episodeDetail = props.episodeDetails.find(
    (episodeDetail) => episodeDetail.id === episode.id,
  );
  if (!episodeDetail) {
    return;
  }

  setEpisodeDetail(props, episodeDetail);
}
