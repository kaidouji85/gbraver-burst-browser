import { pop } from "../../../dom/animation";
import type { DifficultyDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * VeryHardが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onVeryHardPush(
  props: DifficultyDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.play();
    await pop(props.veryHardButton);
    props.selectionComplete.next("VeryHard");
  });
}
