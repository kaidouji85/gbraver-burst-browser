import { pushDOMStream } from "../../../dom/event-stream";
import type { Unsubscriber } from "../../../stream/stream";
import type { TitleProps } from "../props";
import { onArcadePush } from "./on-arcade-push";
import { onAvatarPush } from "./on-avatar-push";
import { onCasualMatchPush } from "./on-casual-match-push";
import { onConfigPush } from "./on-config-push";
import { onLoginPush } from "./on-login-push";
import { onLogoutPush } from "./on-logout-push";
import { onPushDeleteAccount } from "./on-push-delete-account";
import { onRootPush } from "./on-root-push";
import { onTutorialPush } from "./on-tutorial-push";

/**
 * タイトル画面にイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: TitleProps): Unsubscriber[] {
  return [pushDOMStream(props.root).subscribe(action => {
    onRootPush(props, action);
  }), pushDOMStream(props.login).subscribe(action => {
    onLoginPush(props, action);
  }), pushDOMStream(props.avatar).subscribe(action => {
    onAvatarPush(props, action);
  }), pushDOMStream(props.deleteAccount).subscribe(action => {
    onPushDeleteAccount(props, action);
  }), pushDOMStream(props.logout).subscribe(action => {
    onLogoutPush(props, action);
  }), pushDOMStream(props.tutorial).subscribe(action => {
    onTutorialPush(props, action);
  }), pushDOMStream(props.arcade).subscribe(action => {
    onArcadePush(props, action);
  }), pushDOMStream(props.casualMatch).subscribe(action => {
    onCasualMatchPush(props, action);
  }), pushDOMStream(props.config).subscribe(action => {
    onConfigPush(props, action);
  })];
}