import { map } from "rxjs";

import { Config } from "../../../dom-scenes/config";
import { GameProps } from "../../game-props";

/**
 * 設定画面に切り替える
 * @param props ゲームプロパティ
 * @param scene 設定画面
 */
export const switchConfig = (props: GameProps, scene: Config) =>
  props.domSceneBinder.bind(
    scene,
    props.gameAction.connect([
      scene.notifyPrev().pipe(map(() => ({ type: "ConfigChangeCancel" }))),
      scene
        .notifyConfigChanges()
        .pipe(map((config) => ({ type: "ConfigChangeComplete", config }))),
    ]),
  );
