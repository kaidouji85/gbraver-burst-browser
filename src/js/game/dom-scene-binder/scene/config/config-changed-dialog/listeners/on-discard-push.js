// @flow
import { pop } from "../../../../../../dom/animation";
import type { PushDOM } from "../../../../../../dom/event-stream";
import type { ConfigChangedDialogProps } from "../props";

/**
 * 破棄ボタンを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onDiscardPush(
  props: ConfigChangedDialogProps,
  action: $ReadOnly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.play();
    await pop(props.discard);
    props.discardStream.next();
  });
}
