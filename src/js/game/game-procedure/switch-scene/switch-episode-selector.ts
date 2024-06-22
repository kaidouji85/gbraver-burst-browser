import { map } from "rxjs";

import { EpisodeSelector } from "../../../dom-scenes/episode-selector";
import { GameProps } from "../../game-props";

/**
 * エピソードセレクト画面に切り替える
 * @param props ゲームプロパティ
 * @param scene チュートリアルステージセレクト画面
 */
export const switchEpisodeSelector = (
  props: GameProps,
  scene: EpisodeSelector,
) =>
  props.domSceneBinder.bind(
    scene,
    props.gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "CancelTutorialSelect" }))),
      scene
        .notifySelection()
        .pipe(map((a) => ({ ...a, type: "SelectEpisode" }))),
    ]),
  );
