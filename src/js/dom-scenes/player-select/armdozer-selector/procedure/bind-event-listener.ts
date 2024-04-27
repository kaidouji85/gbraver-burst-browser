import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { ArmdozerSelectorProps } from "../props";
import { onArmdozerSelect } from "./on-armdozer-select";
import { onOkButtonPush } from "./on-ok-button-push";
import { onPrevButtonPush } from "./on-prev-button-push";

/**
 * イベントリスナを本コンポ年とに関連づける
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListener(
  props: Readonly<ArmdozerSelectorProps>,
): Unsubscribable[] {
  return [
    ...props.armdozerIcons.map((icon) =>
      icon.notifySelection().subscribe(() => {
        onArmdozerSelect(props, icon.armdozerId);
      }),
    ),
    domPushStream(props.okButton).subscribe((action) => {
      onOkButtonPush(props, action);
    }),
    domPushStream(props.prevButton).subscribe((action) => {
      onPrevButtonPush(props, action);
    }),
  ];
}
