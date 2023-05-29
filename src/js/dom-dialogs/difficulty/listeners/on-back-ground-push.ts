import type { DifficultyDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * バックグラウンドが押された際の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackGroundPush(
  props: DifficultyDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    await props.changeValue.play();
    props.closeDialog.next();
  });
}
