import { map } from "rxjs";

import { PlayerSelect } from "../../../dom-scenes/player-select";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * プレイヤーセレクト画面に切り替える
 * @param props ゲームプロパティ
 * @param scene プレイヤーセレクト画面
 */
export const switchPlayerSelect = (props: GameProps, scene: PlayerSelect) =>
  switchDOMScene({
    ...props,
    scene,
    unsubscribers: props.gameAction.connect([
      scene
        .notifySelectCompletion()
        .pipe(map((a) => ({ ...a, type: "SelectionComplete" }))),
      scene.notifyPrev().pipe(map(() => ({ type: "SelectionCancel" }))),
    ]),
  });
