import { PushDOM } from "../../../dom/push-dom";
import { EpisodeType } from "../../../game/story/episode";
import { EpisodeSelectorProps } from "../props";
import { getFirstVisibleEpisodeElement } from "./get-first-visible-episode-element";
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

  props.se.play(props.changeValueSound);
  const episodeType: EpisodeType = "Side Episode";
  switchEpisodeTab(props, episodeType);
  setEpisodesVisible(props, episodeType);
  const firstVisibleEpisodeElement = getFirstVisibleEpisodeElement(props);
  if (!firstVisibleEpisodeElement) {
    return;
  }

  const firstVisibleEpisodeDetail = props.episodeDetails.find(
    (episodeDetail) => episodeDetail.id === firstVisibleEpisodeElement.id,
  );
  if (!firstVisibleEpisodeDetail) {
    return;
  }

  selectEpisodeElement(props, firstVisibleEpisodeElement.id);
  setEpisodeDetail(props, firstVisibleEpisodeDetail);
}
