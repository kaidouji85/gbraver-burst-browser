// @flow

import type {DOMDialog} from "../dialog";

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  _root: HTMLElement;

  /** コンストラクタ */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = 'login';
    this._root.innerHTML = `
      <div class="login__background"></div>
      <div class="login__dialog">
        <div class="login__dialog__caption">カジュアルマッチを始めるには、ログインをしてください</div>
        <form class="login__dialog__form">
          <div class="login__dialog__form__user-name">
            <label class="login__dialog__form__user-name__label">userid</label>
            <input class="login__dialog__form__user-name__input" type="text">
          </div>
          <div class="login__dialog__form__password">
            <label class="login__dialog__form__password__label">password</label>
            <input class="login__dialog__form__password__input" type="password">
          </div>
          <div class="login__dialog__form__footer">
            <button class="login__dialog__form__footer__close">閉じる</button>
            <button class="login__dialog__form__footer__sumit">ログイン</buton>
          </div>
        </form>
      </div>
    `;
  }

  /**
   * デストラクタ相当の処理
   */
   destructor(): void {
     // NOP
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