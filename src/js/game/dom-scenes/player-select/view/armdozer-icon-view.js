// @flow

import type {ArmdozerIcon} from "../state/player-select-state";
import {Observable, Subject} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";

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
   * 選択された際のアニメーション
   *
   * @return アニメーションPromise
   */
  selected(): Promise<void> {
    const animation = this._root.animate([
      {transform: 'scale(1, 1)'},
      {transform: 'scale(1.2, 1.2)'},
      {transform: 'scale(1, 1)'},
    ], 200);
    return waitUntilFinished(animation);
  }

  /**
   * 選択されなかった際のアニメーション
   *
   * @return アニメーションPromise
   */
  noSelected(): Promise<void> {
    const animation = this._root.animate([
      {opacity: 1, transform: 'scale(1, 1)'},
      {opacity: 0, transform: 'scale(0.4, 0.4)'}
    ], 200);
    return waitUntilFinished(animation);
  }
}

/**
 * アニメーションが完了するまで待機する
 *
 * @param animation アニメーション
 * @return アニメーションPromise
 */
export function waitUntilFinished(animation: Animation): Promise<void> {
  return new Promise(resolve => {
    animation.onfinish = () => {
      resolve();
    }
  });
}