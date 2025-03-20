import { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { waitUntilWindowPushWithStream } from "../wait/wait-until-window-push-with-stream";

/**
 * 画面を押下するまで待機する
 * 本関数はカスタムバトルイベントで利用することを想定している
 * @param props イベントプロパティ
 * @returns 画面押下したら発火するPromise
 */
export async function waitUntilWindowPush(
  props: CustomBattleEventProps,
): Promise<void> {
  const signal = props.abort.abortController.signal;
  await waitUntilWindowPushWithStream(props.pushWindow, { signal });
}
