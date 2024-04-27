import { first, Observable } from "rxjs";

import type { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import type { PushWindow } from "../window/push-window";

/**
 * 画面を押下するまで待機する
 * 本関数は他ヘルパー関数で利用することを想定している
 *
 * @param pushWindow 画面押下ストリーム
 * @returns 画面押下したら発火するPromise
 */
export function waitUntilWindowPushWithStream(
  pushWindow: Observable<PushWindow>,
): Promise<void> {
  return new Promise((resolve) => {
    const unsubscriber = pushWindow.pipe(first()).subscribe((action) => {
      action.event.preventDefault();
      unsubscriber.unsubscribe();
      resolve();
    });
  });
}

/**
 * 画面を押下するまで待機する
 * 本関数はカスタムバトルイベントで利用することを想定している
 *
 * @param props イベントプロパティ
 * @returns 画面押下したら発火するPromise
 */
export async function waitUntilWindowPush(
  props: CustomBattleEventProps,
): Promise<void> {
  await waitUntilWindowPushWithStream(props.pushWindow);
}
