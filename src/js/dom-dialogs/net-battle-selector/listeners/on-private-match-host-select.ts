import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { NetBattleSelectorDialogProps } from "../props";

/**
 * プライベートマッチ（ホスト）が選択された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPrivateMatchHostSelect(
  props: NetBattleSelectorDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButton);
    await pop(props.privateMatchHostButton, 1.02);
    props.privateMatchHostSelection.next();
  });
}
