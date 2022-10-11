// @flow
import type {PushDOM} from "../../../../dom/event-stream";
import type {TitleProps} from "../props";
import {pop} from "../../../../dom/animation";

/**
 * ログインが押された際の処理
 * 
 * @param action アクション
 */
export function onLoginPush(props: TitleProps, action: $ReadOnly<PushDOM>): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.pushButton.play();
    await pop(props.login);
    props.pushLogin.next();
  });
}