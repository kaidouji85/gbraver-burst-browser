import { map } from "rxjs";

import { DOMSceneActionConnector } from "../../dom-scenes/dom-scene-binder/action-connector";
import { EpisodeSelector } from "../../dom-scenes/episode-selector";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * チュートリアルステージセレクト画面とゲームアクションを関連付ける
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const tutorialSelectorConnector =
  (
    props: GameActionManageContainer,
  ): DOMSceneActionConnector<EpisodeSelector> =>
  (scene) =>
    props.gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "CancelTutorialSelect" }))),
      scene
        .notifySelection()
        .pipe(map((a) => ({ ...a, type: "SelectEpisode" }))),
    ]);
