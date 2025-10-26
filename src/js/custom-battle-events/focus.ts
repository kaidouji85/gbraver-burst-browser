import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { createAnimationPlay } from "../td-scenes/battle/play-animation";
import {
  activeNearBatterySelectorMessageWindow,
  activeNearBurstButtonMessageWindow,
  activeNearPilotButtonMessageWindow,
  activeNearPlayerBattleSimulatorButtonMessageWindow,
} from "./active-message-window";
import {
  attentionBatterySelector,
  attentionBattleSimulatorButton,
  attentionBurstButton,
  attentionPilotButton,
  unAttentionAllButtons,
  unattentionBatterySelector,
  unattentionBattleSimulatorButton,
  unattentionBurstButton,
  unattentionPilotButton,
} from "./attention";
import { disabledAllButtons, enabledAllButtons } from "./button-disabled";
import { invisibleAllMessageWindows } from "./invisible-all-message-windows";

/**
 * すべてのプレイヤーの予測ダメージ表示が無効化されているか判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueですべて無効化されている
 */
const isAllPredicatedDamageDisabled = (
  props: CustomBattleEventProps,
): boolean =>
  props.view.hud.players.every((p) => p.predicatedDamage.isDisabled());

/**
 * バッテリーセレクタにフォーカスインする
 * フォーカスインしたもの以外は、操作不可能にする
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const focusInBatterySelector = async (props: CustomBattleEventProps) => {
  const playAnimation = createAnimationPlay(props);
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionBatterySelector(props);
  props.view.hud.gameObjects.batterySelector.disabled(false);
  invisibleAllMessageWindows(props);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200),
  );
  activeNearBatterySelectorMessageWindow(props);
};

/**
 * バッテリーセレクタにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueでフォーカスしている
 */
export const isBatterySelectorFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    !props.view.hud.gameObjects.batterySelector.isDisabled() &&
    props.view.hud.gameObjects.burstButton.isDisabled() &&
    props.view.hud.gameObjects.pilotButton.isDisabled() &&
    isAllPredicatedDamageDisabled(props)
  );
};

/**
 * バッテリーセレクタからフォーカスアウトする
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const focusOutBatterySelector = async (
  props: CustomBattleEventProps,
) => {
  const playAnimation = createAnimationPlay(props);
  props.view.dom.nearBatterySelectorMessageWindow.visible(false);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0, 200),
  );
  unattentionBatterySelector(props);
  enabledAllButtons(props);
};

/**
 * バーストボタンにフォーカスインする
 * フォーカスインしたもの以外は、操作不可能にする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @returns 処理が完了したら発火するPromise
 */
export const focusInBurstButton = async (
  props: CustomBattleEventProps,
  caption: string[],
) => {
  const playAnimation = createAnimationPlay(props);
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionBurstButton(props);
  props.view.hud.gameObjects.burstButton.disabled(false);
  invisibleAllMessageWindows(props);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200),
  );
  activeNearBurstButtonMessageWindow(props);
  props.view.dom.nearBurstButtonMessageWindow.messages(caption);
};

/**
 * バーストボタンにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueでフォーカスしている
 */
export const isBurstButtonFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    props.view.hud.gameObjects.batterySelector.isDisabled() &&
    !props.view.hud.gameObjects.burstButton.isDisabled() &&
    props.view.hud.gameObjects.pilotButton.isDisabled() &&
    isAllPredicatedDamageDisabled(props)
  );
};

/**
 * バーストボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const focusOutBurstButton = async (props: CustomBattleEventProps) => {
  const playAnimation = createAnimationPlay(props);
  props.view.dom.nearBurstButtonMessageWindow.visible(false);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0, 200),
  );
  unattentionBurstButton(props);
  enabledAllButtons(props);
};

/**
 * パイロットボタンにフォーカスインする
 * フォーカスインしたもの以外は、操作不可能にする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @returns 処理が完了したら発火するPromise
 */
export const focusInPilotButton = async (
  props: CustomBattleEventProps,
  caption: string[],
) => {
  const playAnimation = createAnimationPlay(props);
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionPilotButton(props);
  props.view.hud.gameObjects.pilotButton.disabled(false);
  invisibleAllMessageWindows(props);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200),
  );
  activeNearPilotButtonMessageWindow(props);
  props.view.dom.nearPilotButtonMessageWindow.messages(caption);
};

/**
 * パイロットボタンにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueでフォーカスしている
 */
export const isPilotButtonFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    props.view.hud.gameObjects.batterySelector.isDisabled() &&
    props.view.hud.gameObjects.burstButton.isDisabled() &&
    !props.view.hud.gameObjects.pilotButton.isDisabled() &&
    isAllPredicatedDamageDisabled(props)
  );
};

/**
 * パイロットボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const focusOutPilotButton = async (props: CustomBattleEventProps) => {
  const playAnimation = createAnimationPlay(props);
  props.view.dom.nearPilotButtonMessageWindow.visible(false);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0, 200),
  );
  unattentionPilotButton(props);
  enabledAllButtons(props);
};

/**
 * バトルシミュレーターボタンにフォーカスする
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function focusBattleSimulatorButton(
  props: CustomBattleEventProps,
) {
  const playAnimation = createAnimationPlay(props);
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionBattleSimulatorButton(props);
  props.view.hud.players.forEach((p) => {
    p.predicatedDamage.disabled(false);
  });
  invisibleAllMessageWindows(props);
  await playAnimation(
    props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200),
  );
  activeNearPlayerBattleSimulatorButtonMessageWindow(props);
}

/**
 * バトルシミュレーターボタンにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueでフォーカスしている
 */
export const isBattleSimulatorButtonFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    props.view.hud.gameObjects.batterySelector.isDisabled() &&
    props.view.hud.gameObjects.burstButton.isDisabled() &&
    props.view.hud.gameObjects.pilotButton.isDisabled() &&
    !isAllPredicatedDamageDisabled(props)
  );
};

/**
 * バトルシミュレーターボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const focusOutBattleSimulatorButton = async (
  props: CustomBattleEventProps,
) => {
  const playAnimation = createAnimationPlay(props);
  props.view.dom.nearPlayerBattleSimulatorButtonMessageWindow.visible(false);
  await playAnimation(props.view.hud.gameObjects.frontmostFader.opacity(0, 0));
  unattentionBattleSimulatorButton(props);
  enabledAllButtons(props);
};
