// @flow

import { pushDOMStream } from "../../../dom/event-stream";
import type { Unsubscriber } from "../../../stream/stream";
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
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: DifficultyDialogProps
): Unsubscriber[] {
  return [
    pushDOMStream(props.backGround).subscribe((action) => {
      onBackGroundPush(props, action);
    }),
    pushDOMStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    pushDOMStream(props.easy).subscribe((action) => {
      onEasyPush(props, action);
    }),
    pushDOMStream(props.normal).subscribe((action) => {
      onNormalPush(props, action);
    }),
    pushDOMStream(props.hard).subscribe((action) => {
      onHardPush(props, action);
    }),
    pushDOMStream(props.veryHard).subscribe((action) => {
      onVeryHardPush(props, action);
    }),
  ];
}
