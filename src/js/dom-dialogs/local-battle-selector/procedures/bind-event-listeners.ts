import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { LocalBattleSelectorDialogProps } from "../props";
import { onLocalBattleHostPushed } from "./on-local-battle-host-pushed";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export const bindEventListeners = (
  props: LocalBattleSelectorDialogProps,
): Unsubscribable[] => {
  return [
    domPushStream(props.localBattleHostButton).subscribe((action) => {
      onLocalBattleHostPushed(props, action);
    }),
  ];
};
