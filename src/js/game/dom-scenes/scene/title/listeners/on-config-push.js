// @flow
import {pop} from "../../../../../dom/animation";
import type {PushDOM} from "../../../../../dom/event-stream";
import type {TitleProps} from "../props";

/**
 * 設定が押された時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onConfigPush(props: TitleProps, action: $ReadOnly<PushDOM>): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.changeValue.play();
    await pop(props.config);
    props.pushConfig.next();
  });
}