import { EpisodeElement } from "../episode-element";
import { EpisodeSelectorProps } from "../props";

/**
 * 現在表示されているエピソード要素で一番上のものを取得する
 * @param props 画面プロパティ
 * @returns 取得結果、見つからない場合はnull
 */
export function getFirstVisibleEpisodeElement(
  props: Readonly<EpisodeSelectorProps>,
): EpisodeElement | null {
  return props.episodeElements.find((episode) => episode.isVisible()) ?? null;
}
