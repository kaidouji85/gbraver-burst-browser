import { map } from "rxjs";

import { EpisodeSelector } from "../../../dom-scenes/episode-selector";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * エピソードセレクト画面に切り替える
 * @param props ゲームプロパティ
 * @param scene チュートリアルステージセレクト画面
 */
export const switchEpisodeSelector = (
  props: GameProps,
  scene: EpisodeSelector,
) =>
  switchDOMScene({
    ...props,
    scene,
    unsubscribers: props.gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "CancelTutorialSelect" }))),
      scene
        .notifySelection()
        .pipe(map((a) => ({ ...a, type: "SelectEpisode" }))),
    ]),
  });
