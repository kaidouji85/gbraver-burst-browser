// @flow

import type {ServiceWorkerUpdateState} from "./service-worker-update-state";

/**
 * サービスワーカーが更新される際の処理
 *
 * @param state 更新前
 * @return 更新後
 */
export function serviceWorkerWillUpdate(state: ServiceWorkerUpdateState): ServiceWorkerUpdateState {
  return {
    ...state,
    isVisible: true
  };
}
