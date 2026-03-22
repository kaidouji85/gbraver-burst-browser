import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { LocalBattleGuestDialogProps } from "../props";
import { onBattleStartPushed } from "./on-battle-start-pushed";
import { onCloserPushed } from "./on-closer-pushed";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export const bindEventListeners = (
  props: LocalBattleGuestDialogProps,
): Unsubscribable[] => {
  return [
    domPushStream(props.battleStartButton).subscribe((action) => {
      onBattleStartPushed(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPushed(props, action);
    }),
  ];
};
