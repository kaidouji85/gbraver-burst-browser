// @flow

import {Howl} from 'howler';
import {Observable} from "rxjs";
import type {ArmDozerId, PilotId} from "gbraver-burst-core";
import {waitFinishAnimation} from "../../../wait/wait-finish-animation";
import type {Resources} from "../../../resource";
import {pushDOMStream} from "../../../action/push/push-dom";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import type {PushDOM} from "../../../action/push/push-dom";
import {SOUND_IDS} from "../../../resource/sound";
import {getPilotIconPathId} from "../../../path/pilot-icon-path";

/**
 * パイロットアイコン
 */
export class PilotIcon {
  pilotId: ArmDozerId;
  _pushButton: typeof Howl;
  _root: HTMLImageElement;
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

    this._pushButton = resources.sounds
      .find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    this._root = document.createElement('img');
    this._root.className = 'player-select__pilot__icon';
    this._select = pushDOMStream(this._root)
    this._isImageLoaded = waitElementLoaded(this._root);
    const pathId = getPilotIconPathId(pilotId);
    const iconResource = resources.paths.find(v => v.id === pathId);
    this._root.src = iconResource
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

  /**
   * アイコン選択通知
   *
   * @return 通知ストリーム
   */
  selectedNotifier(): Observable<PushDOM> {
    return this._select;
  }
}