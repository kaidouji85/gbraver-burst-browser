// @flow

import {render} from 'react-dom';
import {ServiceWorkerUpdate} from './service-worker-update';

export class ServiceWorkerUpdateView {
  _dom: HTMLElement;

  constructor() {
    this._dom = document.querySelector("#service-worker-update") || document.createElement('div');
  }

  engage(): void {
    render(ServiceWorkerUpdate(), this._dom);
  }
}