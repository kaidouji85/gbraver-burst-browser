import { TutorialSelector } from "../../dom-scenes/tutorial-selector/tutorial-selector";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<TutorialSelector>;

/** チュートリアルステージセレクト画面とゲームアクションを関連付ける */
export const tutorialSelectorConnector: Connector = (scene, gameAction) => [scene.prevNotifier().subscribe(() => {
  gameAction.next({
    type: "CancelTutorialSelect"
  });
}), scene.stageSelectNotifier().subscribe(stageSelect => {
  gameAction.next({ ...stageSelect,
    type: "SelectTutorialStage"
  });
})];