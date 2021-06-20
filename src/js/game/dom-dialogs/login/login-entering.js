// @flow

import {Howl} from 'howler';
import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from '../../../stream/rxjs';
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'login-entering';
/** ルート要素が非表示の時のcssクラス名 */
const INVISIBLE_ROOT_CLASS_NAME = `${ROOT_CLASS_NAME}--invisible`;
/** キャプションのcssクラス名 */
const CAPTION_CLASS_NAME = `${ROOT_CLASS_NAME}__caption`;
/** キャプションが非表示の時のcssクラス名 */
const INVISIBLE_CAPTION_CLASS_NAME = `${CAPTION_CLASS_NAME}--invisible`;
/** エラーメッセージのcssクラス名 */
const ERROR_CLASS_NAME = `${ROOT_CLASS_NAME}__error`;
/** エラーメッセージが非表示の時のcssクラス名 */
const INVISIBLE_ERROR_CLASS_NAME = `${ERROR_CLASS_NAME}--invisible`;

/** data-idを集めたもの */
type DataIDs = {
  caption: string,
  error: string,
  userID: string,
  password: string,
  submit: string,
  closeButton: string,
};

/**
 * ルート要素のinnerHTML
 * 
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${CAPTION_CLASS_NAME}" data-id="${ids.caption}"></div>
    <div class="#{INVISIBLE_ERROR_CLASS_NAME}" data-id="${ids.error}"></div>
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
  caption: HTMLElement,
  error: HTMLElement,
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
  const caption = root.querySelector(`[data-id="${ids.caption}"]`)
    ?? document.createElement('div');

  const error = root.querySelector(`[data-id="${ids.error}"]`)
    ?? document.createElement('div');

  const userIDElement = root.querySelector(`[data-id="${ids.userID}"]`);
  const userID = (userIDElement instanceof HTMLInputElement) ? userIDElement : document.createElement('input');

  const passwordElement = root.querySelector(`[data-id="${ids.password}"]`);
  const password = (passwordElement instanceof HTMLInputElement) ? passwordElement : document.createElement('input');

  const submitElement = root.querySelector(`[data-id="${ids.submit}"]`);
  const submit = (submitElement instanceof HTMLButtonElement) ? submitElement : document.createElement('button');

  const closeButtonElement = root.querySelector(`[data-id="${ids.closeButton}"]`);
  const closeButton = (closeButtonElement instanceof HTMLButtonElement) ? closeButtonElement : document.createElement('button');

  return {caption, error, userID, password, submit, closeButton};
}

/** 入力完了情報 */
export type InputComplete = {
  userID: string,
  password: string,
};

/** ログイン情報入力中 */
export class LoginEntering {
  _root: HTMLElement;
  _caption: HTMLElement;
  _error: HTMLElement;
  _userID: HTMLInputElement;
  _password: HTMLInputElement;
  _submit: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _inputCoomplete: StreamSource<InputComplete>;
  _close: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const dataIDs = {caption: domUuid(), error: domUuid(), userID: domUuid(),
      password: domUuid(), submit: domUuid(), closeButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this._root, dataIDs);

    this._caption = elements.caption;
    this._error = elements.error;
    this._userID = elements.userID;
    this._password = elements.password;
    this._submit = elements.submit;
    this._closeButton = elements.closeButton;

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

    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
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
   * キャプションを表示する
   *
   * @param content 文言
   */
  caption(content: string): void {
    this._caption.innerText = content;
    this._caption.className = CAPTION_CLASS_NAME;
    this._error.className = INVISIBLE_ERROR_CLASS_NAME;
  }

  /**
   * エラーメッセージを表示する
   *
   * @param content 文言
   */
  error(content: string): void {
    this._error.innerText = content;
    this._error.className = ERROR_CLASS_NAME;
    this._caption.className = INVISIBLE_CAPTION_CLASS_NAME;
  }
  
  /**
   * 入力完了通知
   * 
   * @return 通知ストリーム
   */
  inputCompleteNotifier(): Stream<InputComplete> {
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
      await Promise.all([
        pop(this._submit),
        this._pushButton.play()
      ]);
      this._inputCoomplete.next({userID: this._userID.value, password: this._password.value});
    });
  }

  /**
   * 閉じるボタンが押された時の処理
   */
  _onCloseButtonPush(): void {
    this._exclusive.execute(async () => {
      await Promise.all([
        pop(this._closeButton),
        this._changeValue.play()
      ]);
      this._close.next();
    });
  }
}