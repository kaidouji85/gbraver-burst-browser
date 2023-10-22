import {ArmdozerSelectorProps} from "../props";
import {Unsubscribable} from "rxjs";
import {onArmdozerSelect} from "./on-armdozer-select";
import {domPushStream} from "../../../../dom/push-dom";
import {onOkButtonPush} from "./on-ok-button-push";
import {onPrevButtonPush} from "./on-prev-button-push";

/**
 * イベントリスナを本コンポ年とに関連づける
 * @param props プロパティ
 * @return アンサブスクライバ
 */
export function bindEventListener(
  props: Readonly<ArmdozerSelectorProps>,
): Unsubscribable[] {
  return [
    ...props.armdozerIcons.map((v) =>
      v.icon.notifySelection().subscribe(() => {
        onArmdozerSelect(props, v.armdozerId);
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