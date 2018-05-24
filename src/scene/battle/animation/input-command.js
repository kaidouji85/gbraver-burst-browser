import {BattleSceneView} from "../view";
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
  const start = new Tween({}).to({}, 0);
  const end = view.hudLayer.attackButton.visibleAnimation(true);

  start.chain(end);
  return {start, end}
}