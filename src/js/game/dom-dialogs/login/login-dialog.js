// @flow

import type {DOMDialog} from "../dialog";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from '../../../dom/push/push-dom';
import type {Unsubscriber} from "../../../stream/core";
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";
import {LoginEntering} from './login-entering';

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  _root: HTMLElement;
  _loginEntering: LoginEntering;
  _dialog: HTMLElement;
  _closer: HTMLImageElement;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
      ?.path ?? '';

    const dialogID = domUuid();  
    const closerID = domUuid();
    this._root = document.createElement('div');
    this._root.className = 'login';
    this._root.innerHTML = `
      <div class="login__background"></div>
      <img class="login__closer" alt="閉じる" src="${closerPath}" data-id="${closerID}"></img>
      <div class="login__dialog" data-id="${dialogID}"></div>
    `;

    const closer = this._root.querySelector(`[data-id="${closerID}"]`);
    this._closer = (closer instanceof HTMLImageElement) ? closer : document.createElement('img');

    const dialog = this._root.querySelector(`[data-id="${dialogID}"]`);
    this._dialog = (dialog instanceof HTMLElement) ? dialog : document.createElement('div');

    this._loginEntering = new LoginEntering();
    this._loginEntering.show();
    this._dialog.appendChild(this._loginEntering.getRootHTMLElement());

    this._unsubscribers = [
      pushDOMStream(this._closer).subscribe(() => {
        this._onCloserPush();
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
   * クローザーを押した時の処理
   */
  _onCloserPush(): void {
    this._exclusive.execute(async () => {
      await pop(this._closer, 1.3);
    });
  }
}