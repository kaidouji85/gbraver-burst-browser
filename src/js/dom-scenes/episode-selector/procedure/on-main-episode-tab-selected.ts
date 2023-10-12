import { PushDOM } from "../../../dom/push-dom";
import { EpisodeType } from "../../../game/episodes/episode";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisode } from "./get-first-visible-episode";
import { setEpisodeDetail } from "./set-episode-detail";
import { setEpisodeTab } from "./set-episode-tab";
import { setEpisodesVisible } from "./set-episodes-visible";

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
  props.changeValueSound.sound.play();
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
