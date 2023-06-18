import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { TutorialSelectorProps } from "../props";
import { onPrevPush } from "./on-prev-push";
import { onTutorialStageSelect } from "./on-tutorial-stage-select";

/**
 * 画面にイベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<TutorialSelectorProps>
): Unsubscribable[] {
  return [
    domPushStream(props.prevButton).subscribe((action) => {
      onPrevPush(props, action);
    }),
    ...props.stageElements.map((stage) =>
      stage.notifyStageSelection().subscribe(() => {
        onTutorialStageSelect(props, stage);
      })
    ),
  ];
}
