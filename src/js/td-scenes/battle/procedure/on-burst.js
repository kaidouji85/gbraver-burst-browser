// @flow
import {all} from "../../../animation/all";
import {delay} from "../../../animation/delay";
import type {DoBurst} from "../actions/do-burst";
import {animationPlayer} from "../animation-player";
import type {BattleSceneProps} from "../battle-scene-props";
import {progressGame} from "./progress-game";

/**
 * バースト時の処理
 * 
 * @param props 戦闘シーンプロパティ 
 * @param action バースト発動アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onBurst(props: $ReadOnly<BattleSceneProps>, action: DoBurst): Promise<void> {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    const burstCommand = {type: 'BURST_COMMAND'};
    const {isCommandCanceled} = props.customBattleEvent 
      ? await props.customBattleEvent.onBurstCommandSelected({...props, burst: burstCommand})
      : {isCommandCanceled: false};
    if (isCommandCanceled) {
      return;
    }
    await animationPlayer(props).play(
      all(
        props.view.hud.gameObjects.burstButton.decide(),
        props.view.hud.gameObjects.batterySelector.close(),
        props.view.hud.gameObjects.pilotButton.close(),
        props.view.hud.gameObjects.timeScaleButton.close(),
      )
        .chain(delay(500))
        .chain(props.view.hud.gameObjects.burstButton.close())
    );
    await progressGame(props, burstCommand);
  });
}