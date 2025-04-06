import { EpisodeID } from "../../../game/story/episodes/episode";
import { EpisodeSelectorProps } from "../props";

/**
 * 指定したエピソード要素を選択した状態にする
 * @param props 画面プロパティ
 * @param episodeID エピソードID
 */
export function selectEpisodeElement(
  props: Readonly<EpisodeSelectorProps>,
  episodeID: EpisodeID,
) {
  props.episodeElements.forEach((episodeElement) => {
    episodeElement.checked(episodeElement.id === episodeID);
  });
}
