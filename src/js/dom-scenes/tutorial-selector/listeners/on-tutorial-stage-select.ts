import { TutorialSelectorProps } from "../props";
import { TutorialStageElement } from "../tutorial-stage-element";

/**
 * チュートリアルステージ選択
 * @param props 画面プロパティ
 * @param stageElement チュートリアルステージ HTML要素
 */
export function onTutorialStageSelect(
  props: Readonly<TutorialSelectorProps>,
  stageElement: TutorialStageElement,
): void {
  props.exclusive.execute(async () => {
    await stageElement.selected();
    props.stageSelect.next({
      id: stageElement.id,
      level: stageElement.level,
    });
  });
}
