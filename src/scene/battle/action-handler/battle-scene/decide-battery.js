// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {DecideBattery} from "../../../../action/battle-scene/decide-battery";
import type {ProgressBattle} from "../../progress-battle/progress-battle";
import {battleSceneAnimation} from "../../animation";
import {createEmptyTween} from "../../../../tween/empty-tween";

/** 攻撃バッテリーを決定した際のイベント */
export async function decideBattery(view: BattleSceneView, state: BattleSceneState, action: DecideBattery, progressBattle: ProgressBattle): Promise<void> {
  await closeUI(view);

  const command = {
    type: 'BATTERY_COMMAND',
    battery: view.hudLayer.batterySelector.getBattery()
  };
  const gameState = await progressBattle(command);
  console.log(command);// TODO テストが終わったら消す
  console.log(gameState); // TODO テストが終わったら消す

  battleSceneAnimation(view, state, gameState);
}

/** UIを閉じるアニメーション */
function closeUI(view: BattleSceneView): Promise<void> {
  return new Promise(resolve => {
    const start = createEmptyTween();
    const pushOkButton = view.hudLayer.batterySelector.pushOkButton();
    const invisibleBurstButton = view.hudLayer.burstButton.invisible();
    const end = createEmptyTween();

    start.chain(pushOkButton.start, invisibleBurstButton.start);
    pushOkButton.end.chain(end);
    end.onComplete(() => resolve());

    start.start();
  });
}