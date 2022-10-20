// @flow
import type { Resources } from "../../../resource";
import { bindScene } from "../bind-scene";
import { discardCurrentScene } from "../discard-current-scene";
import type { DOMScenesProps } from "../props";
import type { TutorialStage } from "../scene/tutorial-selector/tutoria-stage-element";
import { TutorialSelector } from "../scene/tutorial-selector/tutorial-selector";

/**
 * チュートリアル選択画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param resources リソース管理オブジェクト
 * @param stages ステージ情報
 * @return 開始された設定画面
 */
export function startTutorialSelector(
  props: DOMScenesProps,
  resources: Resources,
  stages: TutorialStage[]
): TutorialSelector {
  discardCurrentScene(props);
  const scene = new TutorialSelector(resources, stages);
  bindScene(props, scene);
  props.unsubscribers = [
    scene.prevNotifier().subscribe(() => {
      props.gameAction.next({ type: "CancelTutorialSelect" });
    }),
    scene.stageSelectNotifier().subscribe((stageSelect) => {
      props.gameAction.next({ ...stageSelect, type: "SelectTutorialStage" });
    }),
  ];
  return scene;
}
