// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import type {ProgressBattle} from "../../progress-battle";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import {animation} from "../../animation";

/** OMボタンを押した時のイベント */
export async function pushOkButton(view: BattleSceneView, state: BattleSceneState, progressBattle: ProgressBattle): Promise<void> {
  await invisibleUI(view);
  const update = await progressBattle({type: 'BatteryComamnd', battery: 0}); // TODO バッテリースライダーから値を取得する
  animation(view, state, update);
}

/** UI非表示アニメ */
function invisibleUI(view: BattleSceneView): Promise<void> {
  return new Promise(resolve => {
    const start = new Tween({});
    const okButtonInvisible = view.hudLayer.okButton.visibleAnimation(false);
    const batterySliderInvisible = view.hudLayer.batterySlider.visibleAnimation(false);

    start.to({}, 0);
    start.chain(
      okButtonInvisible,
      batterySliderInvisible
    );
    start.start();

    okButtonInvisible.onComplete(() => resolve());
  });
}