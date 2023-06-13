import { TutorialSelector } from "../../dom-scenes/tutorial-selector";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<TutorialSelector>;

/** チュートリアルステージセレクト画面とゲームアクションを関連付ける */
export const tutorialSelectorConnector: Connector = (scene, gameAction) => [
  scene.notifyPrev().subscribe(() => {
    gameAction.next({
      type: "CancelTutorialSelect",
    });
  }),
  scene.notifyStageSelection().subscribe((stageSelect) => {
    gameAction.next({ ...stageSelect, type: "SelectTutorialStage" });
  }),
];
