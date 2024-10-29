import { map } from "rxjs";

import { BattleScene } from "../../../td-scenes/battle";
import { GameProps } from "../../game-props";

/**
 * 戦闘シーンをバインドする
 * @param props ゲームプロパティ
 * @param scene 戦闘シーン
 */
export const bindBattleScene = (props: GameProps, scene: BattleScene) => {
  props.tdSceneBinder.bind(
    scene,
    props.gameAction.connect([
      scene.notifyGameEnd().pipe(map((a) => ({ ...a, type: "EndBattle" }))),
    ]),
  );
};
