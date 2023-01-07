import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import type { DifficultyDialogProps } from "../props";

/**
 * Easyが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onEasyPush(props: DifficultyDialogProps, action: PushDOM): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.play();
    await pop(props.easyButton);
    props.selectionComplete.next("Easy");
  });
}