import { map } from "rxjs";

import { BattleScene } from "../../../td-scenes/battle";
import { GameProps } from "../../game-props";

/**
 * 戦闘シーンに切り替える
 * @param props ゲームプロパティ
 * @param scene 戦闘シーン
 */
export const switchBattleScene = (props: GameProps, scene: BattleScene) => {
  props.tdBinder.bind(scene, () =>
    props.gameAction.connect([
      scene.notifyGameEnd().pipe(map((a) => ({ ...a, type: "EndBattle" }))),
    ]),
  );
};
