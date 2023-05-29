import { pop } from "../../../dom/animation";
import type { TitleProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * アーケードが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onArcadePush(
  props: TitleProps,
  action: Readonly<PushDOM>
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.pushButton.play();
    await pop(props.arcade);
    props.pushArcade.next();
  });
}
