// @flow

import {Howl} from 'howler';
import {Observable} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";
import type {Resources} from "../../../../resource";
import {getArmdozerIconPathId} from "../../../../path/armdozer-icon-path";
import type {PushDOM} from "../../../../action/push/push-dom";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {SOUND_IDS} from "../../../../resource/sound";

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIcon {
  armDozerId: ArmDozerId;
  _pushButton: typeof Howl;
  _root: HTMLElement;
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

    this._pushButton = resources.sounds
      .find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    this._root = document.createElement('div');
    this._root.className = 'player-select__armdozer-icon';

    this._image = document.createElement('img');
    this._image.className = 'player-select__armdozer-icon__image';
    this._root.appendChild(this._image);
    
    this._select = pushDOMStream(this._image)
    this._isImageLoaded = waitElementLoaded(this._image);
    const pathId = getArmdozerIconPathId(armDozerId);
    const iconResource = resources.paths.find(v => v.id === pathId);
    this._image.src = iconResource
      ? iconResource.path
      : '';
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
    return this._root;
  }

  /**
   * アイコン選択アニメーション
   *
   * @return アニメーション
   */
  selected(): Promise<void> {
    this._pushButton.play();
    const animation = this._image.animate([
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

  /**
   * アイコン選択通知
   *
   * @return 通知ストリーム
   */
  selectedNotifier(): Observable<PushDOM> {
    return this._select;
  }
}