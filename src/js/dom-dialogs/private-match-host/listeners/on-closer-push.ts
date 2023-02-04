import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { PrivateMatchHostDialogProps } from "../props";

/**
 * クロージャを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: PrivateMatchHostDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    action.event.stopPropagation();
    await pop(props.closer, 1.3);
  });
}
