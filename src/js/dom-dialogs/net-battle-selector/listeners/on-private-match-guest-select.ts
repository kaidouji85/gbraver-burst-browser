import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { NetBattleSelectorDialogProps } from "../props";

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
    props.casualMatchSelection.next();
  });
}
