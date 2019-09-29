// @flow

import type {ServiceWorkerUpdateState} from "./service-worker-update-state";

export function serviceWorkerWillUpdate(state: ServiceWorkerUpdateState): ServiceWorkerUpdateState {
  return {
    ...state,
    isVisible: true
  };
}
