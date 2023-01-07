import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import type { DifficultyDialogProps } from "../props";

/**
 * 閉じるボタンが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(props: DifficultyDialogProps, action: PushDOM): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.play();
    await pop(props.closer, 1.3);
    props.closeDialog.next();
  });
}