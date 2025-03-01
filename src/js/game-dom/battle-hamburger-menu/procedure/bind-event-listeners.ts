import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { pushWindowsStream } from "../../../window/push-window";
import {
  extractBackGround,
  extractEndBattle,
  extractRetry,
} from "../dom/extract-element";
import { BattleHamburgerMenuProps } from "../props";
import { onBackgroundPush } from "./on-background-push";
import { onBattleSimulatorPush } from "./on-battle-simulator-push";
import { onEndBattleButtonPush } from "./on-end-battle-button-push";
import { onEndBattleCancelPush } from "./on-end-battle-cancel-push";
import { onEndBattleConfirmDialogCloserPush } from "./on-end-battle-confirm-dialog-closer-push";
import { onEndBattleConfirmDialogPush } from "./on-end-battle-confirm-dialog-push";
import { onEndBattlePush } from "./on-end-battle-push";
import { onHamburgerIconPush } from "./on-hamburger-icon-push";
import { onMenuOutsidePush } from "./on-menu-outside-push";
import { onRetryButtonPush } from "./on-retry-button-push";
import { onRetryCancelButtonPush } from "./on-retry-cancel-button-push";
import { onRetryConfirmDialogCloserPush } from "./on-retry-confirm-dialog-closer-push";
import { onRetryConfirmDialogPush } from "./on-retry-confirm-dialog-push";
import { onRetryPush } from "./on-retry-push";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバー
 */
export function bindEventListeners(
  props: BattleHamburgerMenuProps,
): Unsubscribable[] {
  return [
    domPushStream(props.hamburgerIcon).subscribe((action) => {
      onHamburgerIconPush(props, action);
    }),
    pushWindowsStream().subscribe(() => {
      onMenuOutsidePush(props);
    }),
    domPushStream(props.retryConfirmDialog).subscribe((action) => {
      onRetryConfirmDialogPush(action);
    }),
    domPushStream(extractRetry(props.root)).subscribe((action) => {
      onRetryPush(props, action);
    }),
    domPushStream(props.retryConfirmDialogCloser).subscribe((action) => {
      onRetryConfirmDialogCloserPush(props, action);
    }),
    domPushStream(extractBackGround(props.root)).subscribe((action) => {
      onBackgroundPush(props, action);
    }),
    domPushStream(props.retryCancelButton).subscribe((action) => {
      onRetryCancelButtonPush(props, action);
    }),
    domPushStream(props.retryButton).subscribe((action) => {
      onRetryButtonPush(props, action);
    }),
    domPushStream(props.battleSimulator).subscribe((action) => {
      onBattleSimulatorPush(props, action);
    }),
    domPushStream(props.endBattleConfirmDialog).subscribe((action) => {
      onEndBattleConfirmDialogPush(action);
    }),
    domPushStream(extractEndBattle(props.root)).subscribe((action) => {
      onEndBattlePush(props, action);
    }),
    domPushStream(props.endBattleConfirmDialogCloser).subscribe((action) => {
      onEndBattleConfirmDialogCloserPush(props, action);
    }),
    domPushStream(props.endBattleCancelButton).subscribe((action) => {
      onEndBattleCancelPush(props, action);
    }),
    domPushStream(props.endBattleButton).subscribe((action) => {
      onEndBattleButtonPush(props, action);
    }),
  ];
}
