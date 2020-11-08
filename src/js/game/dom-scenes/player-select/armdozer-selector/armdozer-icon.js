// @flow

import {Observable} from "rxjs";
import type {Resources} from "../../../../resource";
import type {PushDOM} from "../../../../action/push/push-dom";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {pop} from "../../../../dom/animation/pop";

/**
 * トール要素のCSSクラス名
 */
const ROOT_CLASS_NAME = 'player-select__armdozer-icon';

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
   * @param imagePath 画像ファイルのパス
   * @param alt 代替テキスト
   */
  constructor(resources: Resources, imagePath: string, alt: string) {
    this._image = document.createElement('img');
    this._image.className = ROOT_CLASS_NAME;
    
    this._select = pushDOMStream(this._image)
    this._isImageLoaded = waitElementLoaded(this._image);
    this._image.src = imagePath;
    this._image.alt = alt;
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
    await pop(this._image);
  }

  /**
   * アイコンが選択された状態にする
   *
   * @param isSelected 選択されたか否かのフラグ、trueで選択された
   */
  selected(isSelected: boolean): void {
    this._image.className = isSelected
      ? `${ROOT_CLASS_NAME}--selected`
      : ROOT_CLASS_NAME;
  }
}