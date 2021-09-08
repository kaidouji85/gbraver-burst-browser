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
/** クローザーのcssクラス名 */
const CLOSER_CLASS_NAME = `${ROOT_CLASS_NAME}__closer`;

/** data-idを集めたもの */
type DataIDs = {
  dialog: string,
  closer: string,
  backGround: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, resources: Resources): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)
    ?.path ?? '';
  return `
    <div class="${ROOT_CLASS_NAME}__background" data-id="${ids.backGround}"></div>
    <img class="${CLOSER_CLASS_NAME}" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
    <div class="${ROOT_CLASS_NAME}__dialog" data-id="${ids.dialog}">
      <div class="${ROOT_CLASS_NAME}__dialog__footer">
        <button class="${ROOT_CLASS_NAME}__dialog__footer__close" type="button">閉じる</button>
        <button class="${ROOT_CLASS_NAME}__dialog__footer__sumit" type="submit">ログイン</buton>
      </div>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  dialog: HTMLElement,
  closer: HTMLImageElement,
  backGround: HTMLElement,
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
  const dialog = root.querySelector(`[data-id="${ids.dialog}"]`)
    ?? document.createElement('div');
  const backGround = root.querySelector(`[data-id="${ids.backGround}"]`)
    ?? document.createElement('div');
  return {closer, dialog, backGround};
}

/** 本ダイアログで利用するAPIの機能 */
export interface OwnAPI extends IdPasswordLogin {}

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  _login: IdPasswordLogin;
  _root: HTMLElement;
  _dialog: HTMLElement;
  _closer: HTMLImageElement;
  /** @deprecated */
  _loginSuccess: StreamSource<void>;
  _closeDialog: StreamSource<void>;
  /** @deprecated */
  _networkError: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _changeValue: typeof Howl;
  _exclusive: Exclusive;

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   * @param login ログイン処理を実行するオブジェクト
   * @param caption 入力フォームに表示されるメッセージ
   */
  constructor(resources: Resources, login: OwnAPI, caption: string) {
    this._login = login;
    console.log(caption);// TODO ダイアログに表示する

    const dataIDs = {dialog: domUuid(), closer: domUuid(), backGround: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs, resources);
    const elements = extractElements(this._root, dataIDs);

    this._closer =elements.closer;
    this._dialog = elements.dialog;

    this._closeDialog = new RxjsStreamSource();
    this._loginSuccess = new RxjsStreamSource();
    this._networkError = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._closer).subscribe(() => {
        this._onCloserPush();
      }),
      pushDOMStream(elements.backGround).subscribe(() => {
        this._onPushOutsideOfDialog();
      }),
    ];

    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
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
   * ログイン成功通知
   * 
   * @return 通知ストリーム
   */
  loginSuccessNotifier(): Stream<void> {
    return this._loginSuccess;
  }

  /**
   * @deprecated
   * 通信エラー通知
   * 
   * @return 通知ストリーム 
   */
  networkErrorNotifier(): Stream<void> {
    return this._networkError;
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