// @flow

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'login-executing';
/** ルート要素が非表示の際のcssクラス名 */
const INVISIBLE_ROOT_CLASS_NAME = `${ROOT_CLASS_NAME}--invisible`;

/**
 * ルート要素のinnerHTML
 *
 * @return innerHTML
 */
function innerHTML(): string {
  return `
    ログイン中
  `;
}

/** ログイン中 */
export class LoginExecuting {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.innerHTML = innerHTML();
    this._root.className = ROOT_CLASS_NAME;
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
   * 表示する
   */
  show(): void {
    this._root.className = ROOT_CLASS_NAME;
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this._root.className = INVISIBLE_ROOT_CLASS_NAME;
  }
}