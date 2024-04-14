import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { DifficultyDialogProps } from "../props";

/**
 * Hardが押された際の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onHardPush(
  props: DifficultyDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButton);
    await pop(props.hardButton);
    props.selectionComplete.next("Hard");
  });
}
