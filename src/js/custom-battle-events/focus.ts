import type { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import {
  activeNearBatterySelectorMessageWindow,
  activeNearBurstButtonMessageWindow,
  activeNearPilotButtonMessageWindow,
} from "./active-message-window";
import {
  attentionBatterySelector,
  attentionBurstButton,
  attentionPilotButton,
  unAttentionAllButtons,
  unattentionBatterySelector,
  unattentionBurstButton,
  unattentionPilotButton,
} from "./attention";
import { disabledAllButtons, enabledAllButtons } from "./button-disabled";
import { invisibleAllMessageWindows } from "./invisible-all-message-windows";

/**
 * バッテリーセレクタにフォーカスインする
 * フォーカスインしたもの以外は、操作不可能にする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @return 処理が完了したら発火するPromise
 */
export const focusInBatterySelector = async (
  props: CustomBattleEventProps,
  caption: string[],
) => {
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionBatterySelector(props);
  props.view.hud.gameObjects.batterySelector.disabled(false);
  invisibleAllMessageWindows(props);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
  activeNearBatterySelectorMessageWindow(props);
  props.view.dom.nearBatterySelectorMessageWindow.messages(caption);
};

/**
 * バッテリーセレクタにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @return 判定結果、trueでフォーカスしている
 */
export const isBatterySelecterFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    !props.view.hud.gameObjects.batterySelector.isDisabled() &&
    props.view.hud.gameObjects.burstButton.isDisabled() &&
    props.view.hud.gameObjects.pilotButton.isDisabled()
  );
};

/**
 * バッテリーセレクタからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export const focusOutBatterySelector = async (
  props: CustomBattleEventProps,
) => {
  props.view.dom.nearBatterySelectorMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionBatterySelector(props);
  enabledAllButtons(props);
};

/**
 * バーストボタンにフォーカスインする
 * フォーカスインしたもの以外は、操作不可能にする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @return 処理が完了したら発火するPromise
 */
export const focusInBurstButton = async (
  props: CustomBattleEventProps,
  caption: string[],
) => {
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionBurstButton(props);
  props.view.hud.gameObjects.burstButton.disabled(false);
  invisibleAllMessageWindows(props);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
  activeNearBurstButtonMessageWindow(props);
  props.view.dom.nearBurstButtonMessageWindow.messages(caption);
};

/**
 * バーストボタンにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @return 判定結果、trueでフォーカスしている
 */
export const isBurstButtonFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    props.view.hud.gameObjects.batterySelector.isDisabled() &&
    !props.view.hud.gameObjects.burstButton.isDisabled() &&
    props.view.hud.gameObjects.pilotButton.isDisabled()
  );
};

/**
 * バーストボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export const focusOutBurstButton = async (props: CustomBattleEventProps) => {
  props.view.dom.nearBurstButtonMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionBurstButton(props);
  enabledAllButtons(props);
};

/**
 * パイロットボタンにフォーカスインする
 * フォーカスインしたもの以外は、操作不可能にする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @return 処理が完了したら発火するPromise
 */
export const focusInPilotButton = async (
  props: CustomBattleEventProps,
  caption: string[],
) => {
  unAttentionAllButtons(props);
  disabledAllButtons(props);
  attentionPilotButton(props);
  props.view.hud.gameObjects.pilotButton.disabled(false);
  invisibleAllMessageWindows(props);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
  activeNearPilotButtonMessageWindow(props);
  props.view.dom.nearPilotButtonMessageWindow.messages(caption);
};

/**
 * パイロットボタンにフォーカスしているか判定する
 * @param props イベントプロパティ
 * @return 判定結果、trueでフォーカスしている
 */
export const isPilotButtonFocused = (
  props: CustomBattleEventProps,
): boolean => {
  return (
    props.view.hud.gameObjects.batterySelector.isDisabled() &&
    props.view.hud.gameObjects.burstButton.isDisabled() &&
    !props.view.hud.gameObjects.pilotButton.isDisabled()
  );
};

/**
 * パイロットボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export const focusOutPilotButton = async (props: CustomBattleEventProps) => {
  props.view.dom.nearPilotButtonMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionPilotButton(props);
  enabledAllButtons(props);
};
