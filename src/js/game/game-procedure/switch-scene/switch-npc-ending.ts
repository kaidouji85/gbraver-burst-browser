import { map } from "rxjs";

import { GameProps } from "../../game-props";
import { NPCEnding } from "../../scenes/dom-scenes/npc-ending";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * NPCルートエンディング画面に切り替える
 * @param props ゲームプロパティ
 * @param scene NPCルートエンディング画面
 */
export const switchNpcEnding = (props: GameProps, scene: NPCEnding) =>
  switchDOMScene({
    ...props,
    scene,
    unsubscribers: props.gameAction.connect([
      scene.notifyFinish().pipe(map(() => ({ type: "EndNPCEnding" }))),
    ]),
  });
