// @flow

import {Observable} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../../resource";
import {getArmdozerIconPathId} from "../../../../path/armdozer-icon-path";
import type {PushDOM} from "../../../../action/push/push-dom";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIcon {
  armDozerId: ArmDozerId; // TODO 削除する
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
    this.armDozerId = armDozerId;

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
}