// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {BattleSceneView} from "../view";
import {Tween} from "@tweenjs/tween.js/src/Tween";

/**
 * UIの表示・非表示を変更するアニメーション
 *
 * @param view 戦闘シーンビュー
 * @return アニメーション
 */
export function changeUIVisible(view: BattleSceneView, visible: boolean): MultiTween {
  const start = new Tween({});
  const okButtonInvisible = view.hudLayer.okButton.visibleAnimation(visible);
  const batterySliderInvisible = view.hudLayer.batterySlider.visibleAnimation(visible);

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