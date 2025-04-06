import { EpisodeType } from "../../../game/story/episode";
import { EpisodeSelectorProps } from "../props";

/**
 * エピソード対応に応じたタブ表示にする
 * @param props 画面プロパティ
 * @param episodeType エピソードタイプ
 */
export function setEpisodesVisible(
  props: Readonly<EpisodeSelectorProps>,
  episodeType: EpisodeType,
) {
  props.episodeElements.forEach((episode) => {
    episode.visible(episode.type === episodeType);
  });
}
