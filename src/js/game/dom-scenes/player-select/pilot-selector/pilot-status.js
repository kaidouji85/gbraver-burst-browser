// @flow

/**
 * ルート要素のクラス名
 */
const ROOT_CLASS_NAME = 'player-select__pilot-status';

/**
 * パイロットステータス
 */
export class PilotStatus {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}