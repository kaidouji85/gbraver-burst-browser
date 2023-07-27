import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { MailVerifiedIncompleteProps } from "../props";

  /**
   * 再読み込みボタンが押された時の処理
   * @param props 画面プロパティ
   * @param action アクション
   */
export function onReloadButtonPush(
  props: Readonly<MailVerifiedIncompleteProps>,
  action: Readonly<PushDOM>
): void {
    props.exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(props.reloadButton);
      props.reload.next();
    });
  }