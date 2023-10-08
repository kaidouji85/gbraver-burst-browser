import {EpisodeSelectorProps} from "../props";
import {Episode} from "../episode-element/episode";

/**
 * ストーリー詳細を設定する
 * @param props 画面プロパティ
 * @param episode エピソード情報
 */
export function setEpisodeDetail(props: Readonly<EpisodeSelectorProps>, episode: Episode) {
  props.episodeTitle.innerText = episode.title;
  props.episodeIntroduction.innerText = episode.introduction;
}