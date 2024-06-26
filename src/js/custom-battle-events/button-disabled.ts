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
  const { view } = props;
  return [
    view.hud.gameObjects.batterySelector,
    view.hud.gameObjects.burstButton,
    view.hud.gameObjects.pilotButton,
    view.hud.gameObjects.timeScaleButton,
    ...view.hud.players.map((p) => p.predicatedDamage),
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
