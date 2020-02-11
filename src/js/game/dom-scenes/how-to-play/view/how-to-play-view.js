// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";

/** イベント通知 */
type Notifier = {
  prev: Observable<void>;
  paging: Observable<number>;
};

/** 遊び方シーンのビュー */
export class HowToPlayView {
  _prevStream: Subject<void>;
  _pagingStream: Subject<number>;
  _root: HTMLElement;
  _prev: HTMLElement;
  _prevPage: HTMLElement;
  _nextPage: HTMLElement;
  _nowPage: HTMLElement;
  _maxPage: HTMLElement;

  constructor(dom: HTMLElement) {
    this._prevStream = new Subject<void>();
    this._pagingStream = new Subject<number>();

    const rootId = domUuid();
    const prevId = domUuid();
    const prevPageId = domUuid();
    const nextPageId = domUuid();
    const nowPageId = domUuid();
    const maxPageId = domUuid();
    dom.innerHTML = `
      <div class="how-to-play" id="${rootId}">
        <div class="how-to-play__header">
          <div class="how-to-play__header__title">遊び方</div>
        </div>
        <div class="how-to-play__content">
          <ul class="how-to-play__content__rule">
            <li class="how-to-play__content__rule__1">相手の体力を先にゼロにした方の勝ち</li>
            <li class="how-to-play__content__rule__2">攻撃、防御側でバッテリーが出せる</li>
            <li class="how-to-play__content__rule__3">バッテリーの大小でのみ当たり判定が行われる</li>
            <li class="how-to-play__content__rule__4">1試合に1回だけ機体がパワーアップするバーストが使える</li>
          </ul>
        </div>
        <div class="how-to-play__footer">
          <button class="how-to-play__footer__prev" id="${prevId}">&crarr;戻る</button>
          <div class="how-to-play__footer__controllers">
            <button class="how-to-play__footer__controllers__prev-page" id="${prevPageId}">&lt;</button>
            <div class="how-to-play__footer__controllers__now-page" id="${nowPageId}"></div>
            <div class="how-to-play__footer__controllers__slash">/</div>
            <div class="how-to-play__footer__controllers__max-page" id="${maxPageId}"></div>
            <button class="how-to-play__footer__controllers__next-page" id="${nextPageId}">&gt;</button>
          </div>
        </div>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');

    this._prev = document.getElementById(prevId) || document.createElement('div');
    this._prev.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._prevStream.next();
    });
    this._prev.addEventListener('touchend', (e: TouchEvent) => {
      e.preventDefault();
      this._prevStream.next();
    });

    this._prevPage = document.getElementById(prevPageId) || document.createElement('div');
    this._prevPage.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._pagingStream.next(-1);
    });
    this._prevPage.addEventListener('touchend', (e: TouchEvent) => {
      e.preventDefault();
      this._pagingStream.next(-1);
    });

    this._nextPage = document.getElementById(nextPageId) || document.createElement('div');
    this._nextPage.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._pagingStream.next(1);
    });
    this._nextPage.addEventListener('touchend', (e: TouchEvent) => {
      e.preventDefault();
      this._pagingStream.next(1);
    });

    this._nowPage = document.getElementById(nowPageId) || document.createElement('div');

    this._maxPage = document.getElementById(maxPageId) || document.createElement('div');
  }

  /**
   * ステートをビューに反映する
   *
   * @param state ステート
   */
  engage(state: HowToPlayState): void {
    this._root.className = state.isVisible
      ? 'how-to-play'
      : 'how-to-play--invisible';
    this._nowPage.innerText = state.page.toString();
    this._maxPage.innerText = state.maxPage.toString();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      prev: this._prevStream,
      paging: this._pagingStream,

    };
  }
}