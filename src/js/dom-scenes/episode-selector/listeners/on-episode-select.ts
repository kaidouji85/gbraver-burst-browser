import { EpisodeElement } from "../episode-element";
import { EpisodeSelectorProps } from "../props";

/**
 * エピソード選択時の処理
 * @param props 画面プロパティ
 * @param episodeElement エピソードHTML要素
 */
export function onEpisodeSelect(
  props: Readonly<EpisodeSelectorProps>,
  episodeElement: EpisodeElement,
): void {
  episodeElement.check();
  props.episodeElements
    .filter(v => v.id !== episodeElement.id)
    .forEach(v => v.uncheck());
}
