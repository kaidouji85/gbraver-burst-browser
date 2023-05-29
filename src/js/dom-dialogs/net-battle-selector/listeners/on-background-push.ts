import { NetBattleSelectorDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * 背景が押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackgroundPush(
  props: NetBattleSelectorDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.valueChange.sound.play();
    props.dialogClosed.next();
  });
}
