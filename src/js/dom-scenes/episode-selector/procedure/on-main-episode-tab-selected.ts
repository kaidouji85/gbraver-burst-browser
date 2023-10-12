import { PushDOM } from "../../../dom/push-dom";
import { EpisodeType } from "../../../game/episodes/episode";
import { EPISODE_TYPE, EPISODE_TYPE_SELECTED } from "../dom/class-name";
import { EpisodeSelectorProps } from "../props";
import { setEpisodeDetail } from "./set-episode-detail";

/**
 * メインエピソードタブが選択された時の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onMainEpisodeTabSelected(
  props: Readonly<EpisodeSelectorProps>,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.mainEpisodeTab.className = EPISODE_TYPE_SELECTED;
  props.sideEpisodeTab.className = EPISODE_TYPE;
  const episodeType: EpisodeType = "Episode";
  props.episodeElements.forEach((episode) => {
    episode.visible(episode.type === episodeType);
  });
  const firstVisibleEpisode = props.episodeElements.find((episode) =>
    episode.isVisible(),
  );
  if (!firstVisibleEpisode) {
    return;
  }

  firstVisibleEpisode.checked(true);
  const episodeDetail = props.episodeDetails.find(
    (episodeDetail) => episodeDetail.id === firstVisibleEpisode.id,
  );
  if (!episodeDetail) {
    return;
  }

  setEpisodeDetail(props, episodeDetail);
}
