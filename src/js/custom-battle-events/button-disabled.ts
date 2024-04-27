import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";

/** 操作不可能、可能が設定できるボタン */
type OperatableButton = {
  /**
   * 操作不可能、可能を設定する
   * @param isDisabled trueで操作不可能
   */
  disabled(isDisabled: boolean): void;
};

/**
 * イベントプロパティから設定対象ボタンを取得する
 * @param props イベントプロパティ
 * @returns 設定対象ボタン
 */
function getOperatableButtons(
  props: Readonly<CustomBattleEventProps>,
): OperatableButton[] {
  return [
    props.view.hud.gameObjects.batterySelector,
    props.view.hud.gameObjects.burstButton,
    props.view.hud.gameObjects.pilotButton,
    props.view.hud.gameObjects.timeScaleButton,
  ];
}

/**
 * 全てのボタンを操作不可能にする
 * @param props カスタムイベントプロパティ
 */
export function disabledAllButtons(
  props: Readonly<CustomBattleEventProps>,
): void {
  getOperatableButtons(props).forEach((button) => {
    button.disabled(true);
  });
}

/**
 * 全てのボタンを操作可能にする
 * @param props カスタムイベントプロパティ
 */
export function enabledAllButtons(
  props: Readonly<CustomBattleEventProps>,
): void {
  getOperatableButtons(props).forEach((button) => {
    button.disabled(false);
  });
}
