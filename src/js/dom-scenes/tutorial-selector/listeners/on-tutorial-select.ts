import {TutorialSelectorProps} from "../props";
import {TutorialStageElement} from "../tutoria-stage-element";

/**
 * チュートリアルステージ選択
 * @param props 画面プロパティ
 * @param stage チュートリアルステージ HTML要素
 */
export function onTutorialSelect(
  props: Readonly<TutorialSelectorProps>,
  stage: TutorialStageElement
): void {
  props.exclusive.execute(async () => {
    await stage.selected();
    props.stageSelect.next({
      id: stage.id,
      level: stage.level,
    });
  });
}