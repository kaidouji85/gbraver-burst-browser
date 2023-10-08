import { EpisodeElement } from "../episode-element";
import { EpisodeSelectorProps } from "../props";

/**
 * ストーリー詳細を設定する
 * @param props 画面プロパティ
 * @param episode エピソード情報
 */
export function setEpisodeDetail(
  props: Readonly<EpisodeSelectorProps>,
  episode: EpisodeElement,
) {
  props.episodeTitle.innerText = episode.title;
  props.episodeIntroduction.innerText = episode.introduction;
  props.episodeImageCut.src = episode.imageCutPath;
}
