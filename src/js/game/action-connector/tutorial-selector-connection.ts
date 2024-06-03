import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { EpisodeSelector } from "../../dom-scenes/episode-selector";
import { GameAction } from "../game-actions";

/** チュートリアルステージセレクト画面とゲームアクションを関連付ける */
export const tutorialSelectorConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DOMSceneActionConnector<EpisodeSelector> =>
  (scene) =>
    gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "CancelTutorialSelect" }))),
      scene
        .notifySelection()
        .pipe(map((a) => ({ ...a, type: "SelectEpisode" }))),
    ]);
