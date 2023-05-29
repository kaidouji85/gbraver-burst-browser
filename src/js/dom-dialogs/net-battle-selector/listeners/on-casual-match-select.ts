import { pop } from "../../../dom/animation";
import { NetBattleSelectorDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * カジュアルマッチが選択された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCasualMatchSelect(
  props: NetBattleSelectorDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.sound.play();
    await pop(props.casualMatchButton, 1.02);
    props.casualMatchSelection.next();
  });
}
