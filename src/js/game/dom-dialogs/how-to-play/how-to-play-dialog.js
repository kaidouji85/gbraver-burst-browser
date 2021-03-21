// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {merge} from "rxjs";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {Stream} from "../../../stream/core";
import {toStream} from "../../../stream/rxjs";
import type {DOMDialog} from "../dialog";
import {DefinePlugin} from "../../../webpack/define-plugin";

/**
 * 遊び方ダイアログ プレゼンテーション
 */
export class HowToPlay implements DOMDialog {
  _close: Stream<void>;
  _root: HTMLElement;
  _closer: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const movieURL = DefinePlugin.howToPlay;
    const closerId = domUuid();
    const closerResource = resources.paths.find(v => v.id === PathIds.CLOSER);
    const closerPath = closerResource
      ? closerResource.path
      : '';
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
    const rootPush = pushDOMStream(this._root);
    const closerPush = pushDOMStream(this._closer);
    const merged = merge(
      rootPush.getRxjsObservable(),
      closerPush.getRxjsObservable()
    );
    this._close = toStream(merged);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
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
}