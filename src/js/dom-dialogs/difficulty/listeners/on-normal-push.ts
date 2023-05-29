import { pop } from "../../../dom/animation";
import type { DifficultyDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * Normalが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onNormalPush(
  props: DifficultyDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.play();
    await pop(props.normalButton);
    props.selectionComplete.next("Normal");
  });
}
