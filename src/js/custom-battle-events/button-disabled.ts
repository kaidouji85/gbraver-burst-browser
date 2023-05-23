import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/**
 * 全てのボタンを操作不可能にする
 * @param props カスタムイベントプロパティ
 */
export function disabledAllButton(props: Readonly<CustomBattleEventProps>): void {
  props.view.hud.gameObjects.batterySelector.disabled(true);
  props.view.hud.gameObjects.burstButton.disabled(true);
  props.view.hud.gameObjects.pilotButton.disabled(true);
}

/**
 * 全てのボタンを操作可能にする
 * @param props カスタムイベントプロパティ
 */
export function enabledAllButton(props: Readonly<CustomBattleEventProps>): void {
  props.view.hud.gameObjects.batterySelector.disabled(false);
  props.view.hud.gameObjects.burstButton.disabled(false);
  props.view.hud.gameObjects.pilotButton.disabled(false);
}