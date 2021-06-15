// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from '../../../stream/rxjs';
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'login-entering';

/** ルート要素が非表示の時のcssクラス名 */
const INVISIBLE_ROOT_CLASS_NAME = `${ROOT_CLASS_NAME}--invisible`;

/** 入力完了情報 */
type InputComplete = {
  userName: string,
  password: string,
};

/** ログイン情報入力中 */
export class LoginEntering {
  _root: HTMLElement;
  _userName: HTMLInputElement;
  _password: HTMLInputElement;
  _submit: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _inputCoomplete: StreamSource<InputComplete>;
  _close: StreamSource<void>;
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
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="${ROOT_CLASS_NAME}__caption">カジュアルマッチを始めるには、ログインをしてください</div>
      <form class="${ROOT_CLASS_NAME}__form">
        <div class="${ROOT_CLASS_NAME}__form__user-name">
          <label class="${ROOT_CLASS_NAME}__form__user-name__label">userid</label>
          <input class="${ROOT_CLASS_NAME}__form__user-name__input" type="text" name="username" autocomplete="username" data-id="${userNameID}">
        </div>
        <div class="${ROOT_CLASS_NAME}__form__password">
          <label class="${ROOT_CLASS_NAME}__form__password__label">password</label>
          <input class="${ROOT_CLASS_NAME}__form__password__input" type="password" name="password" autocomplete="current-password" data-id="${passwordID}">
        </div>
        <div class="${ROOT_CLASS_NAME}__form__footer">
          <button class="${ROOT_CLASS_NAME}__form__footer__close" data-id="${closeButtonID}">閉じる</button>
          <button class="${ROOT_CLASS_NAME}__form__footer__sumit" type="submit" data-id="${submitID}">ログイン</buton>
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

    this._inputCoomplete = new RxjsStreamSource();
    this._close = new RxjsStreamSource();
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
   * コンポネントを表示する
   */
  show(): void {
    this._root.className = ROOT_CLASS_NAME;
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this._root.className = INVISIBLE_ROOT_CLASS_NAME;
  }

  /**
   * 入力完了通知
   * 
   * @return 通知ストリーム
   */
  iunputCompleteNotifier(): Stream<InputComplete> {
    return this._inputCoomplete;
  }

  /**
   * 閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeNotifier(): Stream<void> {
    return this._close;
  }

  /**
   * ログインボタンが押された時の処理
   */
  _onLoginPush(): void {
    this._exclusive.execute(async () => {
      await pop(this._submit);
      this._inputCoomplete.next({userName: this._userName.value, password: this._password.value});
    });
  }

  /**
   * 閉じるボタンが押された時の処理
   */
  _onCloseButtonPush(): void {
    this._exclusive.execute(async () => {
      await pop(this._closeButton);
      this._close.next();
    });
  }
}