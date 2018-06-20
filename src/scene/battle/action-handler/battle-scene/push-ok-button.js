// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import type {ProgressBattle} from "../../progress-battle";
import {Tween} from '@tweenjs/tween.js';
import {battleDemo} from "../../demo/index";
import {changeUIVisible as invisibleUiTween } from "../../animation/change-ui-visible";

/** OKボタンを押した時のイベント */
export async function pushOkButton(view: BattleSceneView, state: BattleSceneState, progressBattle: ProgressBattle): Promise<void> {
  await invisibleUI(view);
  const battery = view.hudLayer.batterySlider.getBattery();
  const update = await progressBattle({type: 'BatteryComamnd', battery: battery});
  battleDemo(view, state, update);
}

/** UI非表示アニメをPromise化したもの */
function invisibleUI(view: BattleSceneView): Promise<void> {
  return new Promise(resolve => {
    const ret = invisibleUiTween(view, false);
    ret.start.start();
    ret.end.onComplete(resolve)
  });
}