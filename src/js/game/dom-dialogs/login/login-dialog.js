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
  _userName: HTMLInputElement;
  _password: HTMLInputElement;
  _submit: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _closer: HTMLImageElement;
  _unsubscribers: Unsubscriber[];

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
      ?.path ?? '';

    const userNameID = domUuid();
    const passwordID = domUuid();
    const submitID = domUuid();
    const closeButtonID = domUuid();
    const closerID = domUuid();
    this._root = document.createElement('div');
    this._root.className = 'login';
    this._root.innerHTML = `
      <div class="login__background"></div>
      <img class="login__closer" alt="閉じる" src="${closerPath}" data-id="${closerID}"></img>
      <div class="login__dialog">
        <div class="login__dialog__caption">カジュアルマッチを始めるには、ログインをしてください</div>
        <form class="login__dialog__form">
          <div class="login__dialog__form__user-name">
            <label class="login__dialog__form__user-name__label">userid</label>
            <input class="login__dialog__form__user-name__input" type="text" name="userid" data-id="${userNameID}">
          </div>
          <div class="login__dialog__form__password">
            <label class="login__dialog__form__password__label">password</label>
            <input class="login__dialog__form__password__input" type="password" name="password" data-id="${passwordID}">
          </div>
          <div class="login__dialog__form__footer">
            <button class="login__dialog__form__footer__close" data-id="${closeButtonID}">閉じる</button>
            <button class="login__dialog__form__footer__sumit" type="submit" data-id="${submitID}">ログイン</buton>
          </div>
        </form>
      </div>
    `;

    const userName = this._root.querySelector(`[data-id="${userNameID}"]`);
    this._userName = (userName instanceof HTMLInputElement) ? userName : document.createElement('input');

    const password = this._root.querySelector(`[data-id="${passwordID}"]`);
    this._password = (password instanceof HTMLInputElement) ? password : document.createElement('input');

    const submit = this._root.querySelector(`[data-id="${submitID}"]`);
    this._submit = (submit instanceof HTMLButtonElement) ? submit : document.createElement('button');

    const closeButton = this._root.querySelector(`[data-id="${closeButtonID}"]`);
    this._closeButton = (closeButton instanceof HTMLButtonElement) ? closeButton : document.createElement('button');

    const closer = this._root.querySelector(`[data-id="${closerID}"]`);
    this._closer = (closer instanceof HTMLImageElement) ? closer : document.createElement('img');

    this._unsubscribers = [
      pushDOMStream(this._submit).subscribe(() => {
        this._onLoginPush();
      }),
      pushDOMStream(this._closeButton).subscribe(() => {
        this._onCloseButtonPush();
      }),
    ];
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
    // TODO ログインAPI呼び出しをする
    console.log(this._userName.value, this._password.value);
  }

  /**
   * 閉じるボタンが押された時の処理
   */
  _onCloseButtonPush(): void {
    // NOP
  }
}