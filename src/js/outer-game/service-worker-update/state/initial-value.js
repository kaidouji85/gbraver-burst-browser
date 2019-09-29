// @flow

import type {ServiceWorkerUpdateModel} from "./service-worker-update-model";

/**
 * 初期値を生成する
 *
 * @return 初期値
 */
export function createInitialValue(): ServiceWorkerUpdateModel {
  return {
    isVisible: false
  };
}