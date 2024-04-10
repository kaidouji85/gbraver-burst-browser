import { PushDOM } from "../../../dom/push-dom";
import type { DifficultyDialogProps } from "../props";

/**
 * バックグラウンドが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackGroundPush(
  props: DifficultyDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.sound.play();
    props.closeDialog.next();
  });
}
