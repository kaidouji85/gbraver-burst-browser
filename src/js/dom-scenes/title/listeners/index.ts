import { Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../../dom/event-stream";
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
import { onTutorialPush } from "./on-tutorial-push";

/**
 * タイトル画面にイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: TitleProps): Unsubscribable[] {
  return [
    domImmediatePushStream(props.root).subscribe((action) => {
      onRootPush(props, action);
    }),
    domImmediatePushStream(props.login).subscribe((action) => {
      onLoginPush(props, action);
    }),
    domImmediatePushStream(props.avatar).subscribe((action) => {
      onAvatarPush(props, action);
    }),
    domImmediatePushStream(props.helpIcon).subscribe((action) => {
      onHelpIconPush(props, action);
    }),
    ...[...props.helpMenu.querySelectorAll("a")].map((anker) =>
      domImmediatePushStream(anker).subscribe((action) => {
        onHelpAnkerPush(action);
      })
    ),
    domImmediatePushStream(props.deleteAccount).subscribe((action) => {
      onPushDeleteAccount(props, action);
    }),
    domImmediatePushStream(props.logout).subscribe((action) => {
      onLogoutPush(props, action);
    }),
    domImmediatePushStream(props.tutorial).subscribe((action) => {
      onTutorialPush(props, action);
    }),
    domImmediatePushStream(props.arcade).subscribe((action) => {
      onArcadePush(props, action);
    }),
    domImmediatePushStream(props.netBattle).subscribe((action) => {
      onNetBattlePush(props, action);
    }),
    domImmediatePushStream(props.config).subscribe((action) => {
      onConfigPush(props, action);
    }),
  ];
}
