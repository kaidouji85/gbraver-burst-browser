// @flow

import {Observable} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../../resource";
import {getArmdozerIconPathId} from "../../../../path/armdozer-icon-path";
import type {PushDOM} from "../../../../action/push/push-dom";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIcon {
  _image: HTMLImageElement;
  _isImageLoaded: Promise<void>;
  _select: Observable<PushDOM>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerId アームドーザID
   */
  constructor(resources: Resources, armDozerId: ArmDozerId) {
    this._image = document.createElement('img');
    this._image.className = 'player-select__armdozer-icon';
    
    this._select = pushDOMStream(this._image)
    this._isImageLoaded = waitElementLoaded(this._image);
    const pathId = getArmdozerIconPathId(armDozerId);
    this._image.src = resources.paths.find(v => v.id === pathId)
      ?.path ?? '';
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
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
    return this._image;
  }

  /**
   * アイコン選択通知
   *
   * @return 通知ストリーム
   */
  selectedNotifier(): Observable<PushDOM> {
    return this._select;
  }

  /**
   * ポップアニメーション
   *
   * @return アニメーション
   */
  async pop(): Promise<void> {
    const animation = this._image.animate([
      {transform: 'scale(1)'},
      {transform: 'scale(1.1)'},
      {transform: 'scale(1)'},
    ], {
      duration: 200,
      fill: "forwards",
      easing: 'ease'
    });
    await waitFinishAnimation(animation);
  }
}