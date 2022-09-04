// @flow
import type {CustomBattleEventProps} from "../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindow, activeRightMessageWindow} from "./active-message-window";
import {
  attentionBatterySelector,
  attentionBurstButton,
  attentionPilotButton,
  unattentionBatterySelector,
  unattentionBurstButton,
  unattentionPilotButton
} from "./attention";
import {invisibleAllMessageWindows} from "./invisible-all-message-windows";

/**
 * バッテリーセレクタにフォーカスインする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @return 処理が完了したら発火するPromise
 */
export const focusInBatterySelector = async (props: CustomBattleEventProps, caption: string[]) => {
  attentionBatterySelector(props);
  invisibleAllMessageWindows(props);
  activeLeftMessageWindow(props);
  props.view.dom.leftMessageWindow.messages(caption);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
};

/**
 * バッテリーセレクタからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export const focusOutBatterySelector = async (props: CustomBattleEventProps) => {
  props.view.dom.leftMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionBatterySelector(props);
};

/**
 * バーストボタンにフォーカスインする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @return 処理が完了したら発火するPromise
 */
export const focusInBurstButton = async (props: CustomBattleEventProps, caption: string[]) => {
  attentionBurstButton(props);
  invisibleAllMessageWindows(props);
  activeRightMessageWindow(props);
  props.view.dom.rightMessageWindow.messages(caption);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
}

/**
 * バーストボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export const focusOutBurstButton = async (props: CustomBattleEventProps) => {
  props.view.dom.rightMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionBurstButton(props);
}

/**
 * パイロットボタンにフォーカスインする
 * @param props イベントプロパティ
 * @param caption 注釈メッセージ
 * @return 処理が完了したら発火するPromise
 */
export const focusInPilotButton = async (props: CustomBattleEventProps, caption: string[]) => {
  attentionPilotButton(props);
  invisibleAllMessageWindows(props);
  activeRightMessageWindow(props);
  props.view.dom.rightMessageWindow.messages(caption);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
}

/**
 * パイロットボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export const focusOutPilotButton = async (props: CustomBattleEventProps) => {
  props.view.dom.rightMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionPilotButton(props);
}