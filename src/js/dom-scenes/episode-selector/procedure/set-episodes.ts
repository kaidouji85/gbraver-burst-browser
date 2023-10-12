import { EpisodeType } from "../../../game/episodes/episode";
import { EpisodeSelectorProps } from "../props";

/**
 * エピソードタイプに応じたエピソードを表示する
 * @param props 画面プロパティ
 * @param episodeType エピソードタイプ
 */
export function switchEpisodes(
  props: Readonly<EpisodeSelectorProps>,
  episodeType: EpisodeType,
): void {
  props.episodeElements.forEach((episode) => {
    episode.visible(episode.type === episodeType);
  });
}
