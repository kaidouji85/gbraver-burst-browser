// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";

/** イベント通知ストリーム */
export type Notifier = {
  close: Observable<void>
};

/** パラメータ */
export type Param = {
  movieURL: string
};

/**
 * 遊び方ダイアログのビュー
 */
export class HowToPlayView {
  _closeStream: Subject<void>;
  _root: HTMLElement;
  _closer: HTMLElement;

  constructor(movieURL: string) {
    this._closeStream = new Subject();

    const closerId = domUuid();
    this._root = document.createElement('div');
    this._root.innerHTML = `
      <div class="how-to-play__background"></div>
      <div class="how-to-play__closer" data-id="${closerId}">&#x2613;</div>
      <div class="how-to-play__dialog">
        <iframe class="how-to-play__dialog__movie" width="352" height="198" src="${movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
      </div>
    `;

    this._root.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._closeStream.next();
    });
    this._root.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._closeStream.next();
    });

    this._closer = this._root.querySelector(`[data-id="${closerId}"]`) || document.createElement('div');
    this._closer.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._closeStream.next();
    });
    this._closer.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._closeStream.next();
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
      close: this._closeStream,
    };
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}