// @flow

import type {Resources} from "../../../../resource";
import type {PushDOM} from "../../../../dom/push/push-dom";
import {pushDOMStream} from "../../../../dom/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {pop} from "../../../../dom/animation/pop";
import {PathIds} from "../../../../resource/path";
import type {Stream} from "../../../../stream/core";

const ROOT_CLASS_NAME = 'player-select__armdozer-icon';
const IMAGE_CLASS_NAME = `${ROOT_CLASS_NAME}__image`;
const CHECK_CLASS_NAME = `${ROOT_CLASS_NAME}__check`;

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIcon {
  _root: HTMLElement;
  _image: HTMLImageElement;
  _check: HTMLImageElement;
  _isImageLoaded: Promise<void>;
  _isCheckLoaded: Promise<void>;
  _select: Stream<PushDOM>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param imagePath 画像ファイルのパス
   * @param alt 代替テキスト
   */
  constructor(resources: Resources, imagePath: string, alt: string) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;

    this._image = document.createElement('img');
    this._image.className = IMAGE_CLASS_NAME;
    this._isImageLoaded = waitElementLoaded(this._image);
    this._image.src = imagePath;
    this._image.alt = alt;
    this._root.appendChild(this._image);

    this._check = document.createElement('img');
    this._check.className = CHECK_CLASS_NAME;
    this._isCheckLoaded = waitElementLoaded(this._check);
    this._check.src = resources.paths.find(v => v.id === PathIds.CHECK)
      ?.path ?? '';
    this._check.hidden = true;
    this._root.appendChild(this._check);

    this._select = pushDOMStream(this._root);

  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this._isImageLoaded,
      this._isCheckLoaded,
    ]);
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
   * アイコン選択通知
   *
   * @return 通知ストリーム
   */
  selectedNotifier(): Stream<PushDOM> {
    return this._select;
  }

  /**
   * ポップアニメーション
   *
   * @return アニメーション
   */
  async pop(): Promise<void> {
    await pop(this._root);
  }

  /**
   * アイコンが選択された状態にする
   *
   * @param isSelected 選択されたか否かのフラグ、trueで選択された
   */
  selected(isSelected: boolean): void {
    this._image.className = isSelected
      ? `${IMAGE_CLASS_NAME}--selected`
      : IMAGE_CLASS_NAME;
    this._check.hidden = !isSelected;
  }
}