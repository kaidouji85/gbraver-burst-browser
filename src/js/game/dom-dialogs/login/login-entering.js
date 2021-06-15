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

/** data-idを集めたもの */
type DataIDs = {
  userID: string,
  password: string,
  submit: string,
  closeButton: string,
};

/**
 * ルート要素のinnerHTML
 * 
 * @param ids data-idを集めたもの
 * @param caption ダイアログに表示するメッセージ
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, caption: string): string {
  return `
    <div class="${ROOT_CLASS_NAME}__caption">${caption}</div>
    <form class="${ROOT_CLASS_NAME}__form">
      <div class="${ROOT_CLASS_NAME}__form__user-name">
        <label class="${ROOT_CLASS_NAME}__form__user-name__label">userid</label>
        <input class="${ROOT_CLASS_NAME}__form__user-name__input" type="text" name="userid" autocomplete="username" data-id="${ids.userID}">
      </div>
      <div class="${ROOT_CLASS_NAME}__form__password">
        <label class="${ROOT_CLASS_NAME}__form__password__label">password</label>
        <input class="${ROOT_CLASS_NAME}__form__password__input" type="password" name="password" autocomplete="current-password" data-id="${ids.password}">
      </div>
      <div class="${ROOT_CLASS_NAME}__form__footer">
        <button class="${ROOT_CLASS_NAME}__form__footer__close" data-id="${ids.closeButton}">閉じる</button>
        <button class="${ROOT_CLASS_NAME}__form__footer__sumit" type="submit" data-id="${ids.submit}">ログイン</buton>
      </div>
    </form>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  userID: HTMLInputElement,
  password: HTMLInputElement,
  submit: HTMLButtonElement,
  closeButton: HTMLButtonElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const userIDElement = root.querySelector(`[data-id="${ids.userID}"]`);
  const userID = (userIDElement instanceof HTMLInputElement) ? userIDElement : document.createElement('input');

  const passwordElement = root.querySelector(`[data-id="${ids.password}"]`);
  const password = (passwordElement instanceof HTMLInputElement) ? passwordElement : document.createElement('input');

  const submitElement = root.querySelector(`[data-id="${ids.submit}"]`);
  const submit = (submitElement instanceof HTMLButtonElement) ? submitElement : document.createElement('button');

  const closeButtonElement = root.querySelector(`[data-id="${ids.closeButton}"]`);
  const closeButton = (closeButtonElement instanceof HTMLButtonElement) ? closeButtonElement : document.createElement('button');

  return {userID, password, submit, closeButton};
}

/** 入力完了情報 */
export type InputComplete = {
  userID: string,
  password: string,
};

/** ログイン情報入力中 */
export class LoginEntering {
  _root: HTMLElement;
  _userID: HTMLInputElement;
  _password: HTMLInputElement;
  _submit: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _inputCoomplete: StreamSource<InputComplete>;
  _close: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   * 
   * @param caption 入力フォームに表示されるメッセージ
   */
  constructor(caption: string) {
    const dataIDs = {userID: domUuid(), password: domUuid(), submit: domUuid(), closeButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs, caption);
    const elements = extractElements(this._root, dataIDs);

    this._userID = elements.userID;
    this._password = elements.password;
    this._submit = elements.submit;
    this._closeButton = elements.closeButton;

    this._inputCoomplete = new RxjsStreamSource();
    this._close = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._submit)
        .subscribe(this._onLoginPush.bind(this)),
      pushDOMStream(this._closeButton)
        .subscribe(this._onCloseButtonPush.bind(this)),
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
      this._inputCoomplete.next({userID: this._userID.value, password: this._password.value});
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