// @flow
import type {PushDOM} from "../../../../dom/event-stream";
import type {TitleProps} from "../props";

/**
 * アカウント削除を押した時の処理
 * 
 * @param action アクション
 */
export function onPushDeleteAccount(props: TitleProps, action: $ReadOnly<PushDOM>): void {
  action.event.preventDefault();
  props.changeValue.play();
  props.pushDeleteAccount.next();
}