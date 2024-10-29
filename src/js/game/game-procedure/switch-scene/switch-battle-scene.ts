import { map } from "rxjs";

import { BattleScene } from "../../../td-scenes/battle";
import { GameProps } from "../../game-props";
import { switchTDScene } from "./switch-td-scene";

/**
 * 戦闘シーンに切り替える
 * @param props ゲームプロパティ
 * @param scene 戦闘シーン
 */
export const switchBattleScene = (props: GameProps, scene: BattleScene) => {
  switchTDScene({
    ...props,
    scene,
    unsubscribers: props.gameAction.connect([
      scene.notifyGameEnd().pipe(map((a) => ({ ...a, type: "EndBattle" }))),
    ]),
  });
};
