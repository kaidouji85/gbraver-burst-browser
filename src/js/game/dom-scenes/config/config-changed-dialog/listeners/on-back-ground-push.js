// @flow
import type {PushDOM} from "../../../../../dom/event-stream";
import type {ConfigChangedDialogProps} from "../props";

/**
 * 背景を押した時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onBackGroundPush(props: ConfigChangedDialogProps, action: $ReadOnly<PushDOM>): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.play();
    props.closeStream.next();
  });
}