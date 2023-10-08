import { EpisodeElement } from "../episode-element";
import { EpisodeSelectorProps } from "../props";
import { setEpisodeDetail } from "./set-episode-detail";

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
  setEpisodeDetail(props, episodeElement);
  props.episodeElements
    .filter((v) => v.id !== episodeElement.id)
    .forEach((v) => v.uncheck());
}
