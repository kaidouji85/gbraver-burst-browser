// @flow
import {HUD_ATTENTION_ZINDEX} from "../game-object/hud-zindex";
import type {BattleSceneProps} from "../game/td-scenes/battle/custom-battle-event";

/**
 * バッテリーセレクタに注目する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function attentionBatterySelector(props: BattleSceneProps): void {
  props.view.hud.gameObjects.batterySelector.getObject3D().position.z = HUD_ATTENTION_ZINDEX;
}

/**
 * バッテリーセレクタの注目を解除する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function unattentionBatterySelector(props: BattleSceneProps): void {
  props.view.hud.gameObjects.batterySelector.getObject3D().position.z = 0;
}

/**
 * バーストボタンに注目する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function attentionBurstButton(props: BattleSceneProps): void {
  props.view.hud.gameObjects.burstButton.getObject3D().position.z = HUD_ATTENTION_ZINDEX;
}

/**
 * バーストボタンの注目を解除する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function unattentionBurstButton(props: BattleSceneProps): void {
  props.view.hud.gameObjects.burstButton.getObject3D().position.z = 0;
}

/**
 * パイロットボタンに注目する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function attentionPilotButton(props: BattleSceneProps): void {
  props.view.hud.gameObjects.pilotButton.getObject3D().position.z = HUD_ATTENTION_ZINDEX;
}

/**
 * パイロットボタンの注目を解除する
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 */
export function unattentionPilotButton(props: BattleSceneProps): void {
  props.view.hud.gameObjects.pilotButton.getObject3D().position.z = 0;
}