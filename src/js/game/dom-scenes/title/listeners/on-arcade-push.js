// @flow
import type {PushDOM} from "../../../../dom/event-stream";
import type {TitleProps} from "../props";
import {pop} from "../../../../dom/animation";

/**
 * アーケードが押された際の処理
 * 
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onArcadePush(props: TitleProps, action: $ReadOnly<PushDOM>): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.pushButton.play();
    await pop(props.arcade);
    props.pushArcade.next();
  });
}