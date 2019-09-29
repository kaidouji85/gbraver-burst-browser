// @flow

import {render} from 'react-dom';
import {ServiceWorkerUpdate} from './service-worker-update';
import type {ServiceWorkerUpdateState} from "../state/service-worker-update-state";

/** サービスワーカー更新ビュー */
export class ServiceWorkerUpdateView {
  _dom: HTMLElement;

  constructor() {
    this._dom = document.querySelector("#service-worker-update-scene") || document.createElement('div');
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: ServiceWorkerUpdateState): void {
    render(ServiceWorkerUpdate({
      isVisible: state.isVisible
    }), this._dom);
  }
}