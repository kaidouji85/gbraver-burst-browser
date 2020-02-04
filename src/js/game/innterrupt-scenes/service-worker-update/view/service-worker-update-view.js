//@flow

import type {ServiceWorkerUpdateState} from "../state/service-worker-update-state";
import {domUuid} from "../../../../uuid/dom-uuid";

/** コンストラクタのパラメータ */
type Param = {
  dom: HTMLElement;
  initialState: ServiceWorkerUpdateState
};

/** サービスワーカー更新シーンのビュー */
export class ServiceWorkerUpdateView {
  _root: HTMLElement;

  constructor(param: Param) {
    const rootId = domUuid();
    param.dom.innerHTML = `
      <div id="${rootId}" class="service-worker-update">
        <div class="service-worker-update__title">新バージョンがリリースされました</div>
        <div class='service-worker-update__body'>お手数ですが、ゲームを開いているタブを全て閉じた後に、再度ゲームを開いてください。</div>
      </div>
    `;
    this._root = document.getElementById(rootId) || document.createElement('div');

    this.engage(param.initialState);
  }

  /**
   *
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: ServiceWorkerUpdateState): void {
    this._root.style.display = state.isVisible
      ? 'flex'
      : 'none';
  }
}