// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {merge, Observable,} from "rxjs";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {Stream} from "../../../stream/core";
import {toStream} from "../../../stream/rxjs";

/** パラメータ */
export type Param = {
  movieURL: string
};

/**
 * 遊び方ダイアログ プレゼンテーション
 */
export class HowToPlayPresentation {
  _close: Stream<void>;
  _root: HTMLElement;
  _closer: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param movieURL 遊び方動画URL
   */
  constructor(resources: Resources, movieURL: string) {
    const closerId = domUuid();
    const closerResource = resources.paths.find(v => v.id === PathIds.CLOSER);
    const closerPath = closerResource
      ? closerResource.path
      : '';
    this._root = document.createElement('div');
    this._root.className = 'how-to-play';
    this._root.innerHTML = `
      <div class="how-to-play__background"></div>
      <img class="how-to-play__closer" src="${closerPath}" data-id="${closerId}"></img>
      <div class="how-to-play__dialog">
        <iframe class="how-to-play__dialog__movie" src="${movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
      </div>
    `;

    this._closer = this._root.querySelector(`[data-id="${closerId}"]`) || document.createElement('div');
    const rootPush = pushDOMStream(this._root);
    const closerPush = pushDOMStream(this._closer);
    const merged = merge(
      (rootPush.getRxjsObservable(): any),  // TODO rxjsのflow-typedを削除したら :any を消す
      (closerPush.getRxjsObservable(): any) // TODO rxjsのflow-typedを削除したら :any を消す
    );
    this._close = toStream(merged);
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