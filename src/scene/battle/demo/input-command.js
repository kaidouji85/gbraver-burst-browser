import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @return アニメーション
 */
export function inputCommand(view: BattleSceneView, sceneState: BattleSceneState): MultiTween {
  const visibleSlider = view.hudLayer.batterySlider.visibleAnimation(true);
  const empty = new Tween({}).to({}, 0);

  return {
    start: visibleSlider,
    end: empty
  }
}