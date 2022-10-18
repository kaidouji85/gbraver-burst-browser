// @flow
import {all} from "../../../animation/all";
import {delay} from "../../../animation/delay";
import type {DecideBattery} from "../actions/decide-battery";
import {animationPlayer} from "../animation-player";
import type {BattleSceneProps} from "../battle-scene-props";
import {progressGame} from "./progress-game";

/**
 * バッテリー決定時の処理
 * 
 * @param props 戦闘シーンプロパティ 
 * @param action バッテリー決定アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onDecideBattery(props: $ReadOnly<BattleSceneProps>, action: DecideBattery): Promise<void> {
  await props.exclusive.execute(async (): Promise<void> => {
    action.event.stopPropagation();
    const batteryCommand = {type: 'BATTERY_COMMAND', battery: action.battery};
    const {isCommandCanceled} = props.customBattleEvent 
      ? await props.customBattleEvent.onBatteryCommandSelected({...props, battery: batteryCommand})
      : {isCommandCanceled: false};
    if (isCommandCanceled) {
      return;
    }
    await animationPlayer(props).play(
      all(
        props.view.hud.gameObjects.batterySelector.decide(),
        props.view.hud.gameObjects.burstButton.close(),
        props.view.hud.gameObjects.pilotButton.close(),
        props.view.hud.gameObjects.timeScaleButton.close(),
      )
        .chain(delay(500))
        .chain(props.view.hud.gameObjects.batterySelector.close())
    );
    await progressGame(props, batteryCommand);
  });
}