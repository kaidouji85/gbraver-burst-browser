// @flow
import { HUD_ATTENTION_ZINDEX } from "../game-object/hud-zindex";
import type { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * バッテリーセレクタに注目する
 *
 * @param props イベントプロパティ
 */
export function attentionBatterySelector(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.batterySelector.getObject3D().position.z =
    HUD_ATTENTION_ZINDEX;
}

/**
 * バッテリーセレクタの注目を解除する
 *
 * @param props イベントプロパティ
 */
export function unattentionBatterySelector(
  props: CustomBattleEventProps
): void {
  props.view.hud.gameObjects.batterySelector.getObject3D().position.z = 0;
}

/**
 * バーストボタンに注目する
 *
 * @param props イベントプロパティ
 */
export function attentionBurstButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.burstButton.getObject3D().position.z =
    HUD_ATTENTION_ZINDEX;
}

/**
 * バーストボタンの注目を解除する
 *
 * @param props イベントプロパティ
 */
export function unattentionBurstButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.burstButton.getObject3D().position.z = 0;
}

/**
 * パイロットボタンに注目する
 *
 * @param props イベントプロパティ
 */
export function attentionPilotButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.pilotButton.getObject3D().position.z =
    HUD_ATTENTION_ZINDEX;
}

/**
 * パイロットボタンの注目を解除する
 *
 * @param props イベントプロパティ
 */
export function unattentionPilotButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.pilotButton.getObject3D().position.z = 0;
}

/**
 * 全ボタンの注目を解除する
 *
 * @param props イベントプロパティ
 */
export function unAttentionAllButtons(props: CustomBattleEventProps): void {
  unattentionBatterySelector(props);
  unattentionBurstButton(props);
  unattentionPilotButton(props);
}
