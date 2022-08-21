// @flow
import type {GameStateX, StartGame} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import {process} from '../../../../../animation/process'
import type {StateAnimationProps} from "./state-animation-props";

/**
 * ゲーム開始時のアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function startGameAnimation(props: StateAnimationProps, gameState: GameStateX<StartGame>): Animate {
  const activeHUDPlayer = props.view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeHUDPlayer) {
    return empty();
  }

  return empty().chain(
    delay(800),
    process(() => {
      props.sounds.batteryRecover.play();
    }),
    activeHUDPlayer.turnStart.show()
      .chain(delay(400))
      .chain(activeHUDPlayer.turnStart.hidden()),
  );
}