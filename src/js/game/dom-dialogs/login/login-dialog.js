// @flow

import type {DOMDialog} from "../dialog";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from '../../../stream/rxjs';
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";
import {LoginEntering} from './login-entering';
import type {InputComplete} from './login-entering';
import type {IdPasswordLogin} from '@gbraver-burst-network/core';

/** data-idを集めたもの */
type DataIDs = {
  dialog: string,
  closer: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param closerPath クロージャ画像のパス
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, closerPath: string): string {
  return `
    <div class="login__background"></div>
    <img class="login__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}"></img>
    <div class="login__dialog" data-id="${ids.dialog}"></div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  dialog: HTMLElement,
  closer: HTMLImageElement,
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

  const dialogElements = root.querySelector(`[data-id="${ids.dialog}"]`);
  const dialog = (dialogElements instanceof HTMLElement) ? dialogElements : document.createElement('div');

  return {closer, dialog};
}

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  _login: IdPasswordLogin;
  _root: HTMLElement;
  _loginEntering: LoginEntering;
  _dialog: HTMLElement;
  _closer: HTMLImageElement;
  _closeDialog: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   * @param login ログイン処理を実行するオブジェクト
   * @param caption 入力フォームに表示されるメッセージ
   */
  constructor(resources: Resources, login: IdPasswordLogin, caption: string) {
    this._login = login;

    const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
      ?.path ?? '';

    const dataIDs = {dialog: domUuid(), closer: domUuid()};
    this._root = document.createElement('div');
    this._root.className = 'login';
    this._root.innerHTML = rootInnerHTML(dataIDs, closerPath);
    const elements = extractElements(this._root, dataIDs);

    this._closer =elements.closer;
    this._dialog = elements.dialog;

    this._loginEntering = new LoginEntering(caption);
    this._loginEntering.show();
    this._dialog.appendChild(this._loginEntering.getRootHTMLElement());

    this._closeDialog = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._closer)
        .subscribe(this._onCloserPush.bind(this)),
      this._loginEntering.closeNotifier()
        .subscribe(this._onPushCloseButtonPush.bind(this)),
      this._loginEntering.iunputCompleteNotifier()
        .subscribe(this._onInputComplete.bind(this))
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
   * ダイアログ閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this._closeDialog;
  }

  /**
   * クローザーを押した時の処理
   */
  _onCloserPush(): void {
    this._exclusive.execute(async () => {
      await pop(this._closer, 1.3);
      this._closeDialog.next();
    });
  }

  /**
   * 閉じるボタンを押した時の処理
   */
  _onPushCloseButtonPush(): void {
    this._closeDialog.next();
  }

  /**
   * ログイン情報の入力が完了した時の処理
   * 
   * @param data 入力した情報
   */
  _onInputComplete(data: InputComplete): void {
    this._exclusive.execute(async () => {
      const isSuccessLogin = await this._login.login(data.userID, data.password);
      // TODO 処理分岐をする
      console.log(isSuccessLogin);
    });
  }
}