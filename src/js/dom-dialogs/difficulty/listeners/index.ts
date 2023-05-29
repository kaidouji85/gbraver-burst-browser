import { Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../../dom/event-stream";
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
): Unsubscribable[] {
  return [
    domImmediatePushStream(props.backGround).subscribe((action) => {
      onBackGroundPush(props, action);
    }),
    domImmediatePushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domImmediatePushStream(props.easy).subscribe((action) => {
      onEasyPush(props, action);
    }),
    domImmediatePushStream(props.normal).subscribe((action) => {
      onNormalPush(props, action);
    }),
    domImmediatePushStream(props.hard).subscribe((action) => {
      onHardPush(props, action);
    }),
    domImmediatePushStream(props.veryHard).subscribe((action) => {
      onVeryHardPush(props, action);
    }),
  ];
}
