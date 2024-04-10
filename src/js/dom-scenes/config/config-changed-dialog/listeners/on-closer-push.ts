import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import type { ConfigChangedDialogProps } from "../props";

/**
 * クロージャを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: ConfigChangedDialogProps,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await pop(props.closer, 1.3);
    props.closeStream.next();
  });
}
