import { PushDOM } from "../../../dom/push-dom";
import { EpisodeType } from "../../../game/episodes/episode";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisodeAndDetail } from "./get-first-visible-episode-and-detail";
import { isSideEpisodeTabSelected } from "./is-episode-tab-selected";
import { selectEpisodeElement } from "./select-episode";
import { setEpisodeDetail } from "./set-episode-detail";
import { setEpisodesVisible } from "./set-episodes-visible";
import { switchEpisodeTab } from "./switch-episode-tab";

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
  if (isSideEpisodeTabSelected(props)) {
    return;
  }

  props.changeValueSound.sound.play();
  const episodeType: EpisodeType = "Side Episode";
  switchEpisodeTab(props, episodeType);
  setEpisodesVisible(props, episodeType);
  const firstVisible = getFirstVisibleEpisodeAndDetail(props);
  if (!firstVisible) {
    return;
  }

  selectEpisodeElement(props, firstVisible.episode.id);
  setEpisodeDetail(props, firstVisible.episodeDetail);
}
