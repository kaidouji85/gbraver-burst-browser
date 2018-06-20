// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {BattleSceneView} from "../view";
import {Tween} from "@tweenjs/tween.js/src/Tween";

/**
 * UIを非表示にするアニメーション
 *
 * @param view 戦闘シーンビュー
 * @return アニメーション
 */
export function invisibleUI(view: BattleSceneView): MultiTween {
  const start = new Tween({});
  const okButtonInvisible = view.hudLayer.okButton.visibleAnimation(false);
  const batterySliderInvisible = view.hudLayer.batterySlider.visibleAnimation(false);

  start.to({}, 0);
  start.chain(
    okButtonInvisible,
    batterySliderInvisible
  );

  return {
    start: start,
    end: okButtonInvisible
  };
}