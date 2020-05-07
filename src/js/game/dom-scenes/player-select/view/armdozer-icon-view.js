// @flow

import type {ArmdozerIcon} from "../state/player-select-state";
import {Observable, Subject} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";

/**
 * イベント通知
 */
export type Notifier = {
  select: Observable<ArmDozerId>
};

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIconView {
  _root: HTMLElement;
  _select: Subject<ArmDozerId>;

  constructor(state: ArmdozerIcon) {
    this._select = new Subject<ArmDozerId>();

    this._root = document.createElement('img');
    this._root.src = state.image;
    this._root.className = 'player-select__armdozers__icon';
    this._root.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._select.next(state.armdozerId);
    });
    this._root.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._select.next(state.armdozerId);
    });
  }

  /**
   * ルートHTMLを取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return 取得結果
   */
  notifier(): Notifier {
    return {
      select: this._select
    };
  }

  /**
   * アイコン選択アニメーション
   *
   * @return アニメーション
   */
  selected(): Promise<void> {
    const animation = this._root.animate([
      {transform: 'scale(1, 1)'},
      {transform: 'scale(1.1, 1.1)'},
      {transform: 'scale(1, 1)'},
    ], {
      duration: 300,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }

  /**
   * アイコンを非表示にする
   *
   * @return アニメーション
   */
  hidden(): Promise<void> {
    const animation = this._root.animate([
      {opacity: 1, transform: 'scale(1, 1)'},
      {opacity: 0, transform: 'scale(0.9, 0.9)'}
    ], {
      duration: 300,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }
}