import { EpisodeSelector } from "../../dom-scenes/episode-selector";
import type { DOMSceneActionConnector } from "../dom-scene-binder/dom-scene-action-connector";

/** アクションコネクタのデータ型 */
type Connector = DOMSceneActionConnector<EpisodeSelector>;

/** チュートリアルステージセレクト画面とゲームアクションを関連付ける */
export const tutorialSelectorConnector: Connector = (scene, gameAction) => [
  scene.notifyPrev().subscribe(() => {
    gameAction.next({
      type: "CancelTutorialSelect",
    });
  }),
  scene.notifySelection().subscribe((episodeSelect) => {
    gameAction.next({ ...episodeSelect, type: "SelectEpisode" });
  }),
];
