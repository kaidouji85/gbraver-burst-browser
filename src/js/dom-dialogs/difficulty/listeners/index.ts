import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import type { DifficultyDialogProps } from "../props";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloserPush } from "./on-closer-push";
import { onEasyPush } from "./on-easy-push";
import { onHardPush } from "./on-hard-push";
import { onNormalPush } from "./on-normal-push";
import { onVeryHardPush } from "./on-very-hard-push";

/**
 * 難易度選択ダイアログにイベントリスナをバインドする
 *
 * @param props ダイアログプロパティ
 * @returns バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: DifficultyDialogProps,
): Unsubscribable[] {
  return [
    domPushStream(props.backGround).subscribe((action) => {
      onBackGroundPush(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domPushStream(props.easy).subscribe((action) => {
      onEasyPush(props, action);
    }),
    domPushStream(props.normal).subscribe((action) => {
      onNormalPush(props, action);
    }),
    domPushStream(props.hard).subscribe((action) => {
      onHardPush(props, action);
    }),
    domPushStream(props.veryHard).subscribe((action) => {
      onVeryHardPush(props, action);
    }),
  ];
}
