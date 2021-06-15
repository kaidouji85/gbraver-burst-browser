// @flow

import type {DOMDialog} from "../dialog";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Unsubscriber} from "../../../stream/core";

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  _root: HTMLElement;
  _submit: HTMLElement;
  _unsubscribers: Unsubscriber[];

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
      ?.path ?? '';

    const submitID = domUuid();
    this._root = document.createElement('div');
    this._root.className = 'login';
    this._root.innerHTML = `
      <div class="login__background"></div>
      <img class="login__closer" alt="閉じる" src="${closerPath}"></img>
      <div class="login__dialog">
        <div class="login__dialog__caption">カジュアルマッチを始めるには、ログインをしてください</div>
        <form class="login__dialog__form">
          <div class="login__dialog__form__user-name">
            <label class="login__dialog__form__user-name__label">userid</label>
            <input class="login__dialog__form__user-name__input" type="text" name="userid">
          </div>
          <div class="login__dialog__form__password">
            <label class="login__dialog__form__password__label">password</label>
            <input class="login__dialog__form__password__input" type="password" name="password">
          </div>
          <div class="login__dialog__form__footer">
            <button class="login__dialog__form__footer__close" type="submit">閉じる</button>
            <button class="login__dialog__form__footer__sumit" data-id="${submitID}">ログイン</buton>
          </div>
        </form>
      </div>
    `;

    const submit = this._root.querySelector(`[data-id="${submitID}"]`);
    this._submit = (submit instanceof HTMLButtonElement) ? submit : document.createElement('button');

    this._unsubscribers = [
      pushDOMStream(this._submit).subscribe(() => {
        this._onLoginPush();
      })
    ];
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

  /**
   * ログインボタンが押された時の処理
   */
  _onLoginPush(): void {
    // NOP
  }
}