import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import type { TitleProps } from "../props";
import { onArcadePush } from "./on-arcade-push";
import { onAvatarPush } from "./on-avatar-push";
import { onConfigPush } from "./on-config-push";
import { onHelpAnkerPush } from "./on-help-anker-push";
import { onHelpIconPush } from "./on-help-icon-push";
import { onLoginPush } from "./on-login-push";
import { onLogoutPush } from "./on-logout-push";
import { onNetBattlePush } from "./on-net-battle-push";
import { onPushDeleteAccount } from "./on-push-delete-account";
import { onRootPush } from "./on-root-push";
import { onStoryPush } from "./on-story-push";

/**
 * タイトル画面にイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @returns バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: TitleProps): Unsubscribable[] {
  return [
    domPushStream(props.root).subscribe((action) => {
      onRootPush(props, action);
    }),
    domPushStream(props.login).subscribe((action) => {
      onLoginPush(props, action);
    }),
    domPushStream(props.avatar).subscribe((action) => {
      onAvatarPush(props, action);
    }),
    domPushStream(props.helpIcon).subscribe((action) => {
      onHelpIconPush(props, action);
    }),
    ...Array.from(props.helpMenu.querySelectorAll("a")).map((anchor) =>
      domPushStream(anchor).subscribe((action) => {
        onHelpAnkerPush(action);
      }),
    ),
    domPushStream(props.deleteAccount).subscribe((action) => {
      onPushDeleteAccount(props, action);
    }),
    domPushStream(props.logout).subscribe((action) => {
      onLogoutPush(props, action);
    }),
    domPushStream(props.story).subscribe((action) => {
      onStoryPush(props, action);
    }),
    domPushStream(props.arcade).subscribe((action) => {
      onArcadePush(props, action);
    }),
    domPushStream(props.netBattle).subscribe((action) => {
      onNetBattlePush(props, action);
    }),
    domPushStream(props.config).subscribe((action) => {
      onConfigPush(props, action);
    }),
  ];
}
