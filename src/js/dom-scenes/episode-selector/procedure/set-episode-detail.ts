import { EpisodeDetail } from "../episode-detail";
import { EpisodeSelectorProps } from "../props";

/**
 * ストーリー詳細を設定する
 * @param props 画面プロパティ
 * @param episodeDetail エピソード詳細
 */
export function setEpisodeDetail(
  props: Readonly<EpisodeSelectorProps>,
  episodeDetail: EpisodeDetail,
) {
  props.episodeTitle.innerText = episodeDetail.title;
  props.episodeIntroduction.innerText = episodeDetail.introduction;
  props.episodeImageCut.src = episodeDetail.imageCutPath;
}
