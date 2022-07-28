// @flow
import type {BattleSceneProps} from "../game/td-scenes/battle/custom-battle-event";
import type {Stream} from "../stream/stream";
import type {PushWindow} from "../window/push-window";
import {first} from "../stream/operator";

/**
 * 画面を押下するまで待機する
 * 本関数は他ヘルパー関数で利用することを想定している
 * 
 * @param pushWindow 画面押下ストリーム
 * @return 画面押下したら発火するPromise
 */
export function waitUntilWindowPushWithStream(pushWindow: Stream<PushWindow>): Promise<void> {
  return new Promise(resolve => {
    const unsubscriber = pushWindow.chain(first()).subscribe(() => {
      unsubscriber.unsubscribe();
      resolve();
    })
  });
}

/**
 * 画面を押下するまで待機する
 * 本関数はカスタムバトルイベントで利用することを想定している
 *
 * @param props カスタムイベントで利用可能な戦闘シーンプロパティ
 * @return 画面押下したら発火するPromise
 */
export async function waitUntilWindowPush(props: BattleSceneProps): Promise<void> {
  await waitUntilWindowPushWithStream(props.pushWindow);
}