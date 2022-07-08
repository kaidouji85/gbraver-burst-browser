// @flow
import {HUD_ATTENTION_ZINDEX} from "../game-object/hud-zindex";
import {BattleSceneView} from "../game/td-scenes/battle/view";

/**
 * バッテリーセレクタに注目する
 *
 * @param view 戦闘シーンビュー
 */
export function attentionBatterySelector(view: BattleSceneView): void {
  view.hud.gameObjects.batterySelector.getObject3D().position.z = HUD_ATTENTION_ZINDEX;
}

/**
 * バッテリーセレクタの注目を解除する
 *
 * @param view 戦闘シーンビュー
 */
export function unattentionBatterySelector(view: BattleSceneView): void {
  view.hud.gameObjects.batterySelector.getObject3D().position.z = 0;
}

