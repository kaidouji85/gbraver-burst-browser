import { PushDOM } from "../../../dom/push-dom";
import { EpisodeType } from "../../../game/episodes/episode";
import { EPISODE_TYPE, EPISODE_TYPE_SELECTED } from "../dom/class-name";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisode } from "./get-first-visible-episode";
import { setEpisodeDetail } from "./set-episode-detail";
import { setEpisodeTab } from "./set-episode-tab";
import { setEpisodesVisible } from "./set-episodes-visible";

/**
 * サイドエピソードタブが選択された時の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onSideEpisodeTabSelected(
  props: Readonly<EpisodeSelectorProps>,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.changeValueSound.sound.play();
  const episodeType: EpisodeType = "Side Episode";
  setEpisodeTab(props, episodeType);
  setEpisodesVisible(props, episodeType);
  const firstVisible = getFirstVisibleEpisode(props);
  if (!firstVisible) {
    return;
  }

  firstVisible.episode.checked(true);
  setEpisodeDetail(props, firstVisible.episodeDetail);
}
