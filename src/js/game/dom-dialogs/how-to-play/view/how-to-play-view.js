// @flow

import {domUuid} from "../../../../uuid/dom-uuid";
import {merge, Observable,} from "rxjs";
import type {Resources} from "../../../../resource";
import {PathIds} from "../../../../resource/path";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {map} from "rxjs/operators";

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
  _closeStream: Observable<void>;
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

    this._closeStream = merge(
      pushDOMStream(this._root),
      pushDOMStream(this._closer)
    ).pipe(map(v => ((v: any): void)));
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