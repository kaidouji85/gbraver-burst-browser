import { $ReadOnly } from "utility-types";
import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import type { TitleProps } from "../props";

/**
 * チュートリアルが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onTutorialPush(props: TitleProps, action: $ReadOnly<PushDOM>): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.pushButton.play();
    await pop(props.tutorial);
    props.pushTutorial.next();
  });
}