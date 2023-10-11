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
  const episodeDetail = props.episodeDetails.find(
    (v) => v.id === episodeElement.id,
  );
  if (!episodeDetail) {
    return;
  }

  setEpisodeDetail(props, episodeDetail);
  props.changeValueSound.sound.play();
}
