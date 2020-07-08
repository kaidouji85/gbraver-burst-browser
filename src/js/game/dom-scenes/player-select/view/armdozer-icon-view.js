// @flow

import {Observable, Subject} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";
import type {Resources} from "../../../../resource";
import {getArmdozerIconPathId} from "../../../../armdozer-icon/armdozer-icon-path";

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
  _root: HTMLImageElement;
  _isImageLoaded: Promise<void>;
  _select: Subject<void>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerId アームドーザID
   */
  constructor(resources: Resources, armDozerId: ArmDozerId) {
    this.armDozerId = armDozerId;
    this._select = new Subject();

    this._root = document.createElement('img');
    this._root.className = 'player-select__armdozers__icon__image';
    this._root.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._select.next();
    });
    this._root.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._select.next();
    });
    this._isImageLoaded = new Promise(resolve => {
      this._root.addEventListener('load', () => {
        resolve();
      })
    });
    const pathId = getArmdozerIconPathId(armDozerId);
    const iconResource = resources.paths.find(v => v.id === pathId);
    this._root.src = iconResource
      ? iconResource.path
      : '';
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機血k
   */
  waitUntilLoaded(): Promise<void> {
    return this._isImageLoaded;
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
      {transform: 'scale(1)'},
      {transform: 'scale(1.1)'},
      {transform: 'scale(1)'},
    ], {
      duration: 200,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }
}