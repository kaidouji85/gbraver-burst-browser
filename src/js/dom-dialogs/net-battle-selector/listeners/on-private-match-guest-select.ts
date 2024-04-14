import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { NetBattleSelectorDialogProps } from "../props";

/**
 * プライベートマッチ（ゲスト）が選択された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPrivateMatchGuestSelect(
  props: NetBattleSelectorDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButton);
    await pop(props.privateMatchGuestButton, 1.02);
    props.privateMatchGuestSelection.next();
  });
}
