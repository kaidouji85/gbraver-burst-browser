// @flow

import {Observable, Subject} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitFinishAnimation} from "../../../../../wait/wait-finish-animation";
import {ImageWithAlternative} from "../../../../../components/image-with-alternative";

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
  _root: ImageWithAlternative;
  _select: Subject<void>;


  constructor(armDozerId: ArmDozerId, imagePath: string) {
    this.armDozerId = armDozerId;
    this._select = new Subject();

    this._root = new ImageWithAlternative();
    this._root.getRootHTMLElement().className = 'player-select__armdozers__icon';

    this._root.getAlternative().className = 'player-select__armdozers__icon__alternative';
    this._root.getAlternative().innerHTML = `
      NOW LOADING...
    `;

    this._root.getImage().className = 'player-select__armdozers__icon__image';
    this._root.getImage().addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._select.next();
    });
    this._root.getImage().addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._select.next();
    });
    this._root.getImage().src = imagePath;
  }

  /**
   * ルートHTMLを取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root.getRootHTMLElement();
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
    const animation = this._root.getImage().animate([
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
    const animation = this._root.getImage().animate([
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