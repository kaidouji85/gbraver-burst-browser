import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { gameLoopStream } from "../../../../game-loop/game-loop";
import { PrivateMatchQRCodeReaderProps } from "../props";
import { onCloserPush } from "./on-closer-push";
import { onGameLoop } from "./on-game-loop";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: PrivateMatchQRCodeReaderProps,
): Unsubscribable[] {
  return [
    gameLoopStream().subscribe(() => {
      onGameLoop(props);
    }),
    domPushStream(props.closer).subscribe(() => {
      onCloserPush(props);
    }),
  ];
}
