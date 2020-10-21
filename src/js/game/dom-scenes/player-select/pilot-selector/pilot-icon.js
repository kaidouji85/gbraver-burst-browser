// @flow

import {Observable} from "rxjs";
import type {ArmDozerId, PilotId} from "gbraver-burst-core";
import type {Resources} from "../../../../resource";
import type {PushDOM} from "../../../../action/push/push-dom";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {getPilotIconPathId} from "../../../../path/pilot-icon-path";

const ROOT_CLASS_NAME = 'player-select__pilot-icon';

/**
 * パイロットアイコン
 */
export class PilotIcon {
  pilotId: ArmDozerId;
  _image: HTMLImageElement;
  _isImageLoaded: Promise<void>;
  _select: Observable<PushDOM>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   */
  constructor(resources: Resources, pilotId: PilotId) {
    this.pilotId = pilotId;

    this._image = document.createElement('img');
    this._image.className = ROOT_CLASS_NAME;
    this._select = pushDOMStream(this._image)
    this._isImageLoaded = waitElementLoaded(this._image);

    const pathId = getPilotIconPathId(pilotId);
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