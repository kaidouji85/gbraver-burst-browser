import { EpisodeType } from "../../../game/story/episodes/episode";
import { EPISODE_TYPE, EPISODE_TYPE_SELECTED } from "../dom/class-name";
import { EpisodeSelectorProps } from "../props";

/**
 * エピソード対応に応じたタブが選択された状態にする
 * @param props 画面プロパティ
 * @param episodeType エピソードタイプ
 */
export function switchEpisodeTab(
  props: Readonly<EpisodeSelectorProps>,
  episodeType: EpisodeType,
): void {
  props.mainEpisodeTab.className =
    episodeType === "Episode" ? EPISODE_TYPE_SELECTED : EPISODE_TYPE;
  props.sideEpisodeTab.className =
    episodeType === "Side Episode" ? EPISODE_TYPE_SELECTED : EPISODE_TYPE;
}
