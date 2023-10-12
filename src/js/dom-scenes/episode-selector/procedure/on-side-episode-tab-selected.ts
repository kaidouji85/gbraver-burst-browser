import { PushDOM } from "../../../dom/push-dom";
import { EpisodeType } from "../../../game/episodes/episode";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisodeAndDetail } from "./get-first-visible-episode-and-detail";
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
  props.changeValueSound.sound.play();
  const episodeType: EpisodeType = "Side Episode";
  switchEpisodeTab(props, episodeType);
  setEpisodesVisible(props, episodeType);
  const firstVisible = getFirstVisibleEpisodeAndDetail(props);
  if (!firstVisible) {
    return;
  }

  firstVisible.episode.checked(true);
  setEpisodeDetail(props, firstVisible.episodeDetail);
}
