// @flow

import type {Resources} from "../../../../resource";

/**
 * ルート要素のクラス名
 */
export const ROOT_CLASS_NAME = 'player-select__pilot-bust-shot';

/**
 * パイロット バストショット
 */
export class PilotBustShot {
  _resources: Resources;
  _root: HTMLImageElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._resources = resources;
    this._root = document.createElement('img');
    this.hidden();
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
   * シンヤを表示
   */
  shinya(): void {
    this._root.className = ROOT_CLASS_NAME;
    this._root.src = `${this._resources.rootPath.get()}/pilot/shinya/skill-cutin.png`;
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this._root.className = `${ROOT_CLASS_NAME}__hidden`;
    this._root.src = '';
  }
}