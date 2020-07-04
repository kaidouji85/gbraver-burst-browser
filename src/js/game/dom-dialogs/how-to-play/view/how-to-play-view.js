// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";
import type {ResourcePath} from "../../../../resource/path/resource-path";

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
  _dialog: HTMLElement;
  _iframe: HTMLIFrameElement;
  _closer: HTMLElement;

  constructor(movieURL: string, resourcePath: ResourcePath) {
    this._closeStream = new Subject();

    const dialogId = domUuid();
    const closerId = domUuid();
    this._root = document.createElement('div');
    this._root.innerHTML = `
      <div class="how-to-play__background"></div>
      <img class="how-to-play__closer" src="${resourcePath.get()}/dialog/closer.svg" data-id="${closerId}"></img>
      <div class="how-to-play__dialog" data-id="${dialogId}">  </div>
    `;

    this._root.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._closeStream.next();
    });
    this._root.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._closeStream.next();
    });

    this._dialog = this._root.querySelector(`[data-id="${dialogId}"]`) || document.createElement('div');

    this._iframe = document.createElement('iframe');
    this._iframe.className = 'how-to-play__dialog__movie';
    this._iframe.src = movieURL;
    this._iframe.frameBorder = '0';
    this._iframe.setAttribute('allow', 'fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

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

    if (state.isVisible) {
      this._appendIFrame()
    } else {
      this._removeIFrame();
    }
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

  /**
   * youtube動画iframeをDOMに追加する
   */
  _appendIFrame(): void {
    if (this._dialog.contains(this._iframe)) {
      return;
    }

    this._dialog.appendChild(this._iframe);
  }

  /**
   * youtube動画iframeをDOMから取り除く
   */
  _removeIFrame(): void {
    if (!this._dialog.contains(this._iframe)) {
      return;
    }

    this._dialog.appendChild(this._iframe);
  }
}