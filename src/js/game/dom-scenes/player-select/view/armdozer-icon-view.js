// @flow

import {Observable, Subject} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";

/**
 * イベント通知
 */
export type Notifier = {
  select: Observable<void>
};

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIconView {
  armDozerId: ArmDozerId;
  _root: HTMLElement;
  _select: Subject<void>;

  constructor(armDozerId: ArmDozerId, imagePath: string) {
    this.armDozerId = armDozerId;
    this._select = new Subject();

    this._root = document.createElement('img');
    this._root.src = imagePath;
    this._root.className = 'player-select__armdozers__icon';
    this._root.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._select.next();
    });
    this._root.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._select.next();
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
      {width: 'var(--armdozer-icon-width)', margin: 'var(--armdozer-icon-margin)'},
      {width: 'var(--selected-armdozer-icon-width)', margin: 0},
    ], {
      duration: 500,
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
      {opacity: 1, width: 'var(--armdozer-icon-width)', margin: 'var(--armdozer-icon-margin)'},
      {opacity: 0, width: '0', margin: 0}
    ], {
      duration: 500,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }
}