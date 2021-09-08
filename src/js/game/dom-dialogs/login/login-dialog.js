// @flow

import {Howl} from 'howler';
import type {DOMDialog} from "../dialog";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from '../../../stream/rxjs';
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";
import type {IdPasswordLogin} from '@gbraver-burst-network/core';
import {SOUND_IDS} from "../../../resource/sound";

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'login';

/** data-idを集めたもの */
type DataIDs = {
  closer: string,
  backGround: string,
  loginButton: string,
  closeButton: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @param caption キャプション
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, resources: Resources, caption: string): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
    ?.path ?? '';
  return `
    <div class="${ROOT_CLASS_NAME}__background" data-id="${ids.backGround}"></div>
    <img class="${ROOT_CLASS_NAME}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
    <div class="${ROOT_CLASS_NAME}__dialog">
      <div class="${ROOT_CLASS_NAME}__dialog__caption">${caption}</div>
      <div class="${ROOT_CLASS_NAME}__dialog__footer">
        <button class="${ROOT_CLASS_NAME}__dialog__footer__close" data-id="${ids.closeButton}">閉じる</button>
        <button class="${ROOT_CLASS_NAME}__dialog__footer__login" data-id="${ids.loginButton}">ログイン</buton>
      </div>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  closer: HTMLImageElement,
  backGround: HTMLElement,
  loginButton: HTMLButtonElement,
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
  const closerElement = root.querySelector(`[data-id="${ids.closer}"]`);
  const closer = (closerElement instanceof HTMLImageElement) ? closerElement : document.createElement('img');
  const backGround = root.querySelector(`[data-id="${ids.backGround}"]`) ?? document.createElement('div');
  const loginButtonElement = root.querySelector(`[data-id="${ids.loginButton}"]`);
  const loginButton = (loginButtonElement instanceof HTMLButtonElement) ? loginButtonElement : document.createElement('button');
  const closeButtonElement = root.querySelector(`[data-id="${ids.closeButton}"]`);
  const closeButton = (closeButtonElement instanceof HTMLButtonElement) ? closeButtonElement : document.createElement('button');
  return {closer, backGround, loginButton, closeButton};
}

/** 本ダイアログで利用するAPIの機能 */
export interface OwnAPI extends IdPasswordLogin {}

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  _root: HTMLElement;
  _closer: HTMLImageElement;
  _loginButton: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _closeDialog: StreamSource<void>;
  _login: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   * @param caption 入力フォームに表示されるメッセージ
   */
  constructor(resources: Resources, caption: string) {
    const dataIDs = {closer: domUuid(), backGround: domUuid(), loginButton: domUuid(), closeButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs, resources, caption);

    const elements = extractElements(this._root, dataIDs);
    this._closer =elements.closer;
    this._loginButton = elements.loginButton;
    this._closeButton = elements.closeButton;

    this._closeDialog = new RxjsStreamSource();
    this._login = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._loginButton).subscribe(() => {
        this._onLoginButtonPush();
      }),
      pushDOMStream(this._closeButton).subscribe(() => {
        this._onCloseButtonPush();
      }),
      pushDOMStream(this._closer).subscribe(() => {
        this._onCloserPush();
      }),
      pushDOMStream(elements.backGround).subscribe(() => {
        this._onPushOutsideOfDialog();
      }),
    ];

    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
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
   * ダイアログ閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this._closeDialog;
  }

  /**
   * ログイン実行通知
   *
   * @return 通知ストリーム
   */
  loginNotifier(): Stream<void> {
    return this._login;
  }

  /**
   * ログインボタンを押した時の処理
   */
  _onLoginButtonPush(): void {
    this._exclusive.execute(async () => {
      await Promise.all([
        pop(this._loginButton),
        this._pushButton.play()
      ]);
      this._login.next();
    });
  }

  /**
   * 閉じるボタンを押した時の処理
   */
  _onCloseButtonPush(): void {
    this._exclusive.execute(async () => {
      await Promise.all([
        pop(this._closeButton),
        this._changeValue.play()
      ]);
      this._closeDialog.next();
    });
  }

  /**
   * クローザーを押した時の処理
   */
  _onCloserPush(): void {
    this._exclusive.execute(async () => {
      await Promise.all([
        pop(this._closer, 1.3),
        this._changeValue.play()
      ]);
      this._closeDialog.next();
    });
  }

  /**
   * ダイアログ外を押した時の処理
   */
  _onPushOutsideOfDialog(): void {
    this._exclusive.execute(async (): Promise<void>=> {
      await this._changeValue.play();
      this._closeDialog.next();
    });
  }
}