import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { stopDeathAlert } from "../procedure/death-alert";
import { BattleSceneProps } from "../props";

/**
 * ミニコントローラーによる決定アニメーション
 * @param props 戦闘シーンプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export function decisionByMiniController(
  props: Readonly<BattleSceneProps>,
): Animate {
  const { view } = props;
  return all(
    view.dom.miniController
      .decided()
      .chain(delay(200))
      .chain(view.dom.miniController.hidden()),
    onStart(() => {
      view.dom.hamburgerMenu.disableBattleSimulator();
      view.dom.hamburgerMenu.disableStatusOpening();
      stopDeathAlert(props);
    }),
    view.hud.gameObjects.timeScaleButton.close(),
    ...view.hud.players.map((p) => p.statusIcon.close()),
    ...view.hud.players.map(({ predicatedDamage }) =>
      predicatedDamage.hidden(),
    ),
  );
}
