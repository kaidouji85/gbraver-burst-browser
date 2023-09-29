import { EpisodeSelectorProps } from "../props";
import { EpisodeElement } from "../episode-element";

/**
 * チュートリアルステージ選択
 * @param props 画面プロパティ
 * @param stageElement チュートリアルステージ HTML要素
 */
export function onTutorialStageSelect(
  props: Readonly<EpisodeSelectorProps>,
  stageElement: EpisodeElement,
): void {
  props.exclusive.execute(async () => {
    await stageElement.selected();
    props.stageSelect.next({
      id: stageElement.id,
      level: stageElement.level,
    });
  });
}
