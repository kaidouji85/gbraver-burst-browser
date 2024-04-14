import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { TitleProps } from "../props";

/**
 * アーケードが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onArcadePush(
  props: TitleProps,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.se.play(props.pushButton);
    await pop(props.arcade);
    props.pushArcade.next();
  });
}
