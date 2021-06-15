// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Unsubscriber} from "../../../stream/core";
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";

/** ログイン情報入力中 */
export class LoginEntering {
  _root: HTMLElement;
  _userName: HTMLInputElement;
  _password: HTMLInputElement;
  _submit: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   */
  constructor() {
    const userNameID = domUuid();
    const passwordID = domUuid();
    const submitID = domUuid();
    const closeButtonID = domUuid();
    this._root = document.createElement('div');
    this._root.className = 'login-entering';
    this._root.innerHTML = `
      <div class="login-entering__caption">カジュアルマッチを始めるには、ログインをしてください</div>
      <form class="login-entering__form">
        <div class="login-entering__form__user-name">
          <label class="login-entering__form__user-name__label">userid</label>
          <input class="login-entering__form__user-name__input" type="text" name="username" autocomplete="username" data-id="${userNameID}">
        </div>
        <div class="login-entering__form__password">
          <label class="login-entering__form__password__label">password</label>
          <input class="login-entering__form__password__input" type="password" name="password" autocomplete="current-password" data-id="${passwordID}">
        </div>
        <div class="login-entering__form__footer">
          <button class="login-entering__form__footer__close" data-id="${closeButtonID}">閉じる</button>
          <button class="login-entering__form__footer__sumit" type="submit" data-id="${submitID}">ログイン</buton>
        </div>
      </form>
    `;

    const userName = this._root.querySelector(`[data-id="${userNameID}"]`);
    this._userName = (userName instanceof HTMLInputElement) ? userName : document.createElement('input');

    const password = this._root.querySelector(`[data-id="${passwordID}"]`);
    this._password = (password instanceof HTMLInputElement) ? password : document.createElement('input');

    const submit = this._root.querySelector(`[data-id="${submitID}"]`);
    this._submit = (submit instanceof HTMLButtonElement) ? submit : document.createElement('button');

    const closeButton = this._root.querySelector(`[data-id="${closeButtonID}"]`);
    this._closeButton = (closeButton instanceof HTMLButtonElement) ? closeButton : document.createElement('button');


    this._unsubscribers = [
      pushDOMStream(this._submit).subscribe(() => {
        this._onLoginPush();
      }),
      pushDOMStream(this._closeButton).subscribe(() => {
        this._onCloseButtonPush();
      }),
    ];
    this._exclusive = new Exclusive();
  }

  /**
   * デストラクタ相当の処理
   */
   destructor(): void {
     this._unsubscribers.forEach(v => {
       v.unsubscribe();
     });
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
    this._exclusive.execute(async () => {
      await pop(this._submit);
      // TODO ログインAPI呼び出しをする
      console.log(this._userName.value, this._password.value);
    });
  }

  /**
   * 閉じるボタンが押された時の処理
   */
  _onCloseButtonPush(): void {
    this._exclusive.execute(async () => {
      await pop(this._closeButton);
    });
  }
}