import { Unsubscribable } from "rxjs";

import { SecretPlayerSelectProps } from "../props";
import { onArmdozerIconPush } from "./on-armdozer-icon-push";

/**
 * イベントリスナをバインドする
 * @param props プロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(
  props: SecretPlayerSelectProps,
): Unsubscribable[] {
  return props.armdozerIcons.map((armdozerIcon) =>
    armdozerIcon.notifyPush().subscribe(() => {
      onArmdozerIconPush(props, armdozerIcon.armdozerId);
    }),
  );
}
