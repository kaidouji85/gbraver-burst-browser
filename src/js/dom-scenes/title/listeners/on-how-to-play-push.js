// @flow
import type { PushDOM } from "../../../dom/event-stream";
import type { TitleProps } from "../props";

/**
 * 遊び方が押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onHowToPlayPush(
  props: TitleProps,
  action: $ReadOnly<PushDOM>
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.pushHowToPlay.next();
  });
}
