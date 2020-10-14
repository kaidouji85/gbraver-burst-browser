// @flow

import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";

export const ROOT_CLASS_NAME = 'player-select__armdozer-bust-shot';

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShot {
  _resources: Resources;
  _root: HTMLImageElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._resources = resources;
    this._root = document.createElement('img');
    this.shinBraver();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * シンブレイバーを表示
   */
  shinBraver(): void {
    const path = this._resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
      ?.path ?? '';
    this._root.className = `${ROOT_CLASS_NAME}__shin-braver`;
    this._root.src = path;
  }

  /**
   * 非表示
   */
  hidden(): void {
    this._root.className = `${ROOT_CLASS_NAME}__hidden`;
    this._root.src = '';
  }
}
