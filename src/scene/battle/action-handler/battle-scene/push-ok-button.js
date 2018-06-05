// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";
import type {ProgressBattle} from "../../progress-battle";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import {animation} from "../../animation";

/** OMボタンを押した時のイベント */
export function pushOkButton(view: BattleSceneView, state: BattleSceneState, progressBattle: ProgressBattle): void {
  const ret = invisibleUi(view);
  ret.start.start();
  ret.end.onComplete(() =>
    progressBattle({type: 'BatteryComamnd', battery: 0})
      .then(update => animation(view, state, update))
  );
}

/** UI非表示アニメ */
function invisibleUi(view: BattleSceneView): MultiTween {
  const start = new Tween({});
  start.to({}, 0);
  const okButtonInvisible = view.hudLayer.okButton.visibleAnimation(false);
  const batterySliderInvisible = view.hudLayer.batterySlider.visibleAnimation(false);

  start.chain(
    okButtonInvisible,
    batterySliderInvisible
  );

  return {
    start: start,
    end: okButtonInvisible
  };
}