// @flow

import {Howl} from 'howler';
import {domUuid} from "../../../uuid/dom-uuid";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import type {DOMDialog} from "../dialog";
import {DefinePlugin} from "../../../webpack/define-plugin";
import {SOUND_IDS} from "../../../resource/sound";

/**
 * 遊び方ダイアログ プレゼンテーション
 */
export class HowToPlay implements DOMDialog {
  _close: StreamSource<void>;
  _root: HTMLElement;
  _closer: HTMLElement;
  _unsubscribers: Unsubscriber[];
  _changeValue: typeof Howl;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const movieURL = DefinePlugin.howToPlay;
    const closerId = domUuid();
    const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
      ?.path ?? '';
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();

    this._root = document.createElement('div');
    this._root.className = 'how-to-play';
    this._root.innerHTML = `
      <div class="how-to-play__background"></div>
      <img class="how-to-play__closer" alt="閉じる" src="${closerPath}" data-id="${closerId}"></img>
      <div class="how-to-play__dialog">
        <iframe class="how-to-play__dialog__movie" src="${movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
      </div>
    `;

    this._closer = this._root.querySelector(`[data-id="${closerId}"]`) || document.createElement('div');
    this._close = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._root),
      pushDOMStream(this._closer)
    ].map(v => v.subscribe(this._onDialogClose.bind(this)));
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    })
  }

  /**
   * ダイアログ閉じの通知
   *
   * @return 通知ストリーム
   */
  closeNotifier(): Stream<void> {
    return this._close;
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
   * ダイアログを閉じた際の処理
   *
   * @return 処理終了後に発火するPromise
   */
  async _onDialogClose(): Promise<void> {
    await this._changeValue.play();
    this._close.next();
  }
}