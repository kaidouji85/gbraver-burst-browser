// @flow

import {render} from 'react-dom';
import {ServiceWorkerUpdatePresentation} from './presentation';
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
    render(ServiceWorkerUpdatePresentation({
      isVisible: state.isVisible
    }), this._dom);
  }
}