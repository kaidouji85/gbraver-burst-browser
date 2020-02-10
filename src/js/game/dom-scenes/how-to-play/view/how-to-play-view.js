// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";

/** イベント通知 */
type Notifier = {
  prev: Observable<void>;
};

/** 遊び方シーンのビュー */
export class HowToPlayView {
  _prevStream: Subject<void>;
  _root: HTMLElement;
  _prev: HTMLElement;

  constructor(dom: HTMLElement) {
    this._prevStream = new Subject<void>();

    const rootId = domUuid();
    const prevId = domUuid();
    dom.innerHTML = `
      <div class="how-to-play" id="${rootId}">
        <div class="how-to-play__container__header" id="${prevId}">
          <span class="how-to-play__container__header__prev">↩︎</span>
          <span class="how-to-play__container__header__title">遊び方</span>
        </div>
        <div class="how-to-play__content">
          <ul class="how-to-play__content__rule">
            <li class="how-to-play__content__rule__1">相手の体力を先にゼロにした方の勝ち</li>
            <li class="how-to-play__content__rule__2">攻撃、防御側でバッテリーが出せる</li>
            <li class="how-to-play__content__rule__3">バッテリーの大小でのみ当たり判定が行われる</li>
            <li class="how-to-play__content__rule__4">1試合に1回だけ機体がパワーアップするバーストが使える</li>
          </ul>
        </div>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');

    this._prev = document.getElementById(prevId) || document.createElement('div');
    this._prev.addEventListener('click', () => {
      this._prevStream.next();
    });
    this._prev.addEventListener('touchstart', () => {
      this._prevStream.next();
    });
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
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      prev: this._prevStream,
    };
  }
}