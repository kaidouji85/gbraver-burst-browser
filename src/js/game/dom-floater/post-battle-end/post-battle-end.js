// @flow

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'post-end-battle';

/** 戦闘終了後の行動 */
export class PostBattleEnd {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerText = 'post battle end';
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}