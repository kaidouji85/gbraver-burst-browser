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
  props.exclusive.execute(async () => {
    await episodeElement.selected();
    props.episodeSelect.next({
      id: episodeElement.id,
      level: episodeElement.level,
    });
  });
}
