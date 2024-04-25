import { Observable, Unsubscribable } from "rxjs";

import { LoadingActions } from "../../../resource/loading/loading-actions";
import { LoadingProps } from "../props";
import { onLoadingProgress } from "./on-loading-progress";

/**
 * 画面にイベントリストを関連付ける
 * @param props 画面プロパティ
 * @param loading ローディングストリーム
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<LoadingProps>,
  loading: Observable<LoadingActions>,
): Unsubscribable {
  return loading.subscribe((action) => {
    if (action.type === "LoadingProgress") {
      onLoadingProgress(props, action);
    }
  });
}
