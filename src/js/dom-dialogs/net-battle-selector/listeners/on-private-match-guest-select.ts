import { pop } from "../../../dom/animation";
import { NetBattleSelectorDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * プライベートマッチ（ゲスト）が選択された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPrivateMatchGuestSelect(
  props: NetBattleSelectorDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.sound.play();
    await pop(props.privateMatchGuestButton, 1.02);
    props.privateMatchGuestSelection.next();
  });
}
