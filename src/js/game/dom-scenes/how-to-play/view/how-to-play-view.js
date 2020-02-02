// @flow

import type {HowToPlayState} from "../state/how-to-play-state";
import {domUuid} from "../../../../uuid/dom-uuid";

/** 遊び方シーンのビュー */
export class HowToPlayView {
  _root: HTMLElement;

  constructor(dom: HTMLElement) {
    const rootId = domUuid();
    dom.innerHTML = `
      <div class="how-to-play" id="${rootId}">
        <h1 class="how-to-play__title">遊び方</h1>
        <ul class="how-to-play__rule">
          <li class="how-to-play__rule__1">相手の体力を先にゼロにした方の勝ち</li>
          <li class="how-to-play__rule__2">攻撃、防御側でバッテリーが出せる</li>
          <li class="how-to-play__rule__3">バッテリーの大小でのみ当たり判定が行われる</li>
          <li class="how-to-play__rule__4">1試合に1回だけ機体がパワーアップするバーストが使える</li>
        </ul>
        <button class="how-to-play__prev">戻る</button>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');
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
}