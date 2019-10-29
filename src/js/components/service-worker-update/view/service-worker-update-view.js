// @flow

import {render} from 'react-dom';
import {ServiceWorkerUpdateComponent} from './service-worker-update-component';
import type {ServiceWorkerUpdateState} from "../state/service-worker-update-state";

/** サービスワーカー更新ビュー */
export class ServiceWorkerUpdateView {
  _dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this._dom = dom;
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: ServiceWorkerUpdateState): void {
    render(ServiceWorkerUpdateComponent({
      isVisible: state.isVisible
    }), this._dom);
  }
}