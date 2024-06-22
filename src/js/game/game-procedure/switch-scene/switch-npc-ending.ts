import { map } from "rxjs";

import { NPCEnding } from "../../../dom-scenes/npc-ending";
import { GameProps } from "../../game-props";

/**
 * NPCルートエンディング画面に切り替える
 * @param props ゲームプロパティ
 * @param scene NPCルートエンディング画面
 */
export const switchNpcEnding = (props: GameProps, scene: NPCEnding) =>
  props.domSceneBinder.bind(
    scene,
    props.gameAction.connect([
      scene.notifyFinish().pipe(map(() => ({ type: "EndNPCEnding" }))),
    ]),
  );
