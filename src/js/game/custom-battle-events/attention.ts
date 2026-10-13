import { HUD_ATTENTION_Z } from "../game-object/hud-position";
import { CustomBattleEventProps } from "../scenes/td-scenes/battle/custom-battle-event";

/**
 * バッテリーセレクタに注目する
 * @param props イベントプロパティ
 */
export function attentionBatterySelector(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.batterySelector.getObject3D().position.z =
    HUD_ATTENTION_Z;
}

/**
 * バッテリーセレクタの注目を解除する
 * @param props イベントプロパティ
 */
export function unattentionBatterySelector(
  props: CustomBattleEventProps,
): void {
  props.view.hud.gameObjects.batterySelector.getObject3D().position.z = 0;
}

/**
 * バーストボタンに注目する
 * @param props イベントプロパティ
 */
export function attentionBurstButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.burstButton.getObject3D().position.z =
    HUD_ATTENTION_Z;
}

/**
 * バーストボタンの注目を解除する
 * @param props イベントプロパティ
 */
export function unattentionBurstButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.burstButton.getObject3D().position.z = 0;
}

/**
 * パイロットボタンに注目する
 * @param props イベントプロパティ
 */
export function attentionPilotButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.pilotButton.getObject3D().position.z =
    HUD_ATTENTION_Z;
}

/**
 * パイロットボタンの注目を解除する
 * @param props イベントプロパティ
 */
export function unattentionPilotButton(props: CustomBattleEventProps): void {
  props.view.hud.gameObjects.pilotButton.getObject3D().position.z = 0;
}

/**
 * プレイヤーのゲージに注目する
 * @param props イベントプロパティ
 */
export function attentionPlayerGauge(props: CustomBattleEventProps) {
  props.view.hud.players
    .filter((p) => p.playerId === props.playerId)
    .forEach((p) => {
      p.gauge.getObject3D().position.z = HUD_ATTENTION_Z;
    });
}

/**
 * プレイヤーのゲージの注目を解除する
 * @param props イベントプロパティ
 */
export function unattentionPlayerGauge(props: CustomBattleEventProps) {
  props.view.hud.players
    .filter((p) => p.playerId === props.playerId)
    .forEach((p) => {
      p.gauge.getObject3D().position.z = 0;
    });
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
  unattentionPlayerGauge(props);
}
