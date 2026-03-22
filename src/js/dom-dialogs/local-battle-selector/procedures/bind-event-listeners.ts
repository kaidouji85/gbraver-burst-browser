import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { LocalBattleSelectorDialogProps } from "../props";
import { onBackGroundPushed } from "./on-back-ground-pushed";
import { onCloserPushed } from "./on-closer-pushed";
import { onLocalBattleGuestPushed } from "./on-local-battle-guest-pushed";
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
    domPushStream(props.localBattleGuestButton).subscribe((action) => {
      onLocalBattleGuestPushed(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPushed(props, action);
    }),
    domPushStream(props.backGround).subscribe((action) => {
      onBackGroundPushed(props, action);
    }),
  ];
};
