import { EpisodeElement } from "../episode-element";
import { EpisodeSelectorProps } from "../props";
import { selectEpisodeElement } from "./select-episode";
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
  const currentEpisode = props.episodeElements.find((v) => v.isChecked());
  if (!currentEpisode || currentEpisode.id === episodeElement.id) {
    return;
  }

  const episodeDetail = props.episodeDetails.find(
    (v) => v.id === episodeElement.id,
  );
  if (!episodeDetail) {
    return;
  }

  selectEpisodeElement(props, episodeElement.id);
  setEpisodeDetail(props, episodeDetail);
  props.se.play(props.changeValueSound);
}
