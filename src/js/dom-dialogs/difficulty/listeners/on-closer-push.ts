import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { DifficultyDialogProps } from "../props";

/**
 * 閉じるボタンが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: DifficultyDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await pop(props.closer, 1.3);
    props.closeDialog.next();
  });
}
