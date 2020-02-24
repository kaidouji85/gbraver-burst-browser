// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";

/** イベント通知ストリーム */
export type Notifier = {
  prev: Observable<void>
};

/** パラメータ */
export type Param = {
  dom: HTMLElement,
  movieURL: string
};

/**
 * 遊び方ダイアログのビュー
 */
export class HowToPlayView {
  _prevStream: Subject<void>;
  _root: HTMLElement;
  _prev: HTMLElement;

  constructor(param: Param) {
    this._prevStream = new Subject();

    const rootId = domUuid();
    const prevId = domUuid();
    param.dom.innerHTML = `
      <div class="how-to-play" id="${rootId}">
        <div class="how-to-play__background"></div>
        <div class="how-to-play__close" id="${prevId}">X</div>
        <div class="how-to-play__dialog">
          <iframe class="how-to-play__dialog__movie" width="352" height="198" src="${param.movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
        </div>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');

    this._prev = document.getElementById(prevId) || document.createElement('div');
    this._prev.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._prevStream.next();
    });
    this._prev.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._prevStream.next();
    });
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state 状態
   */
  engage(state: HowToPlayState): void {
    this._root.className = state.isVisible
      ? 'how-to-play'
      : 'how-to-play--invisible';
  }

  /**
   * イベント通知
   *
   * @return イベント通知
   */
  notifier(): Notifier {
    return {
      prev: this._prevStream,
    };
  }
}