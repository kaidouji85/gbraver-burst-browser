// @flow

import type {ServiceWorkerUpdateState} from "./service-worker-update-state";

/**
 * 初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): ServiceWorkerUpdateState {
  return {
    isVisible: false
  };
}