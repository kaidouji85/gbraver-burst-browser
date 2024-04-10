import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { TitleProps } from "../props";

/**
 * 設定が押された時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onConfigPush(
  props: TitleProps,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.changeValue.sound.play();
    await pop(props.config);
    props.pushConfig.next();
  });
}
