import type { GameStateX, StartGame } from "gbraver-burst-core";

import { Animate } from "../../../../animation/animate";
import { delay, empty } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import type { StateAnimationProps } from "./state-animation-props";

/**
 * ゲーム開始時のアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function startGameAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<StartGame>,
): Animate {
  const activeTDArmdozer = props.view.td.armdozerObjects.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  const activeHUDPlayer = props.view.hud.players.find(
    (v) => v.playerId === gameState.activePlayerId,
  );

  if (!activeTDArmdozer || !activeHUDPlayer) {
    return empty();
  }

  return empty().chain(
    delay(800),
    onStart(() => {
      props.sounds.batteryRecover.play();
    }),
    activeHUDPlayer.turnStart
      .show()
      .chain(delay(400))
      .chain(activeHUDPlayer.turnStart.hidden()),
    activeTDArmdozer.sprite().startActive(),
  );
}
