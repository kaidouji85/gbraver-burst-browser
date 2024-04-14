import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { DifficultyDialogProps } from "../props";

/**
 * Easyが押された際の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onEasyPush(
  props: DifficultyDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButton);
    await pop(props.easyButton);
    props.selectionComplete.next("Easy");
  });
}
