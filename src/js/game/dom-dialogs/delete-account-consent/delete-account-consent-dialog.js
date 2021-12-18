// @flow

import {Howl} from 'howler';
import type {DOMDialog} from "../dialog";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {domUuid} from "../../../uuid/dom-uuid";
import type {Unsubscriber, Stream, StreamSource} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {PushDOM} from "../../../dom/push/push-dom";
import {pop} from "../../../dom/animation/pop";
import {Exclusive} from "../../../exclusive/exclusive";
import {SOUND_IDS} from "../../../resource/sound";

/** ルート要素 class属性 */
const ROOT_CLASS = 'delete-account-consent';

/** data-idを集めたもの */
type DataIDs = {
  backGround: string,
  closer: string,
  closeButton: string,
  deleteAccountButton: string
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
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
    <div class="${ROOT_CLASS}__dialog">
      <div class="${ROOT_CLASS}__dialog__caption">
        <div>アカウント削除をすると、</div>
        <div>ネット対戦が出来なくなります。</div>
        <div>本当にアカウント削除しますか？</div>
      </div>
      <div class="${ROOT_CLASS}__dialog__controllers">
        <button class="${ROOT_CLASS}__dialog__controllers__close" data-id="${ids.closeButton}">閉じる</button>
        <button class="${ROOT_CLASS}__dialog__controllers__delete-account" data-id="${ids.deleteAccountButton}">アカウント削除</buton>
      </div>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  backGround: HTMLElement,
  closer: HTMLImageElement,
  closeButton: HTMLButtonElement,
  deleteAccountButton: HTMLButtonElement
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
  const deleteAccountButtonElement = root.querySelector(`[data-id="${ids.deleteAccountButton}"]`);
  const deleteAccountButton = (deleteAccountButtonElement instanceof HTMLButtonElement) ? deleteAccountButtonElement : document.createElement('button');
  const closeButtonElement = root.querySelector(`[data-id="${ids.closeButton}"]`);
  const closeButton = (closeButtonElement instanceof HTMLButtonElement) ? closeButtonElement : document.createElement('button');
  return {closer, backGround, deleteAccountButton, closeButton};
}

/** アカウント削除同意ダイアログ */
export class DeleteAccountConsentDialog implements DOMDialog {
  _root: HTMLElement;
  _backGround: HTMLElement;
  _closer: HTMLImageElement;
  _deleteAccountButton: HTMLButtonElement;
  _closeButton: HTMLButtonElement;
  _deleteAccount: StreamSource<void>;
  _closeDialog: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _exclusive: Exclusive;

  /**
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {backGround: domUuid(), closer: domUuid(), deleteAccountButton: domUuid(), closeButton: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(ids, resources);
    this._root.className = ROOT_CLASS;
    
    const elements = extractElements(this._root, ids);
    this._backGround = elements.backGround;
    this._closer = elements.closer;
    this._deleteAccountButton = elements.deleteAccountButton;
    this._closeButton = elements.closeButton;
    
    this._deleteAccount = new RxjsStreamSource();
    this._closeDialog = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._backGround).subscribe(action => {
        this._onPushOutsideOfDialog(action);  
      }),
      pushDOMStream(this._closer).subscribe(action => {
        this._onCloserPush(action);  
      }),
      pushDOMStream(this._deleteAccountButton).subscribe(action => {
        this._onDeleteAccountButtonPush(action);  
      }),
      pushDOMStream(this._closeButton).subscribe(action => {
        this._onCloseButtonPush(action);  
      }),
    ];

    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
    this._exclusive = new Exclusive();
  }

  /** @override */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * アカウント削除通知
   * 
   * @return 通知ストリーム
   */
  deleteAccountNotifier(): Stream<void> {
    return this._deleteAccount;
  }

  /**
   * ダイアログを閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this._closeDialog;
  }

  /**
   * ダイアログ外を押した際の処理
   * 
   * @param action アクション 
   */
   _onPushOutsideOfDialog(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.stopPropagation();
      await this._changeValue.play();
      this._closeDialog.next();
    });
  }

  /**
   * クローザを押した際の処理
   * 
   * @param action アクション 
   */
  _onCloserPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await Promise.all([
        pop(this._closer, 1.3),
        this._changeValue.play()
      ]);
      this._closeDialog.next();
    });
  }

  /**
   * アカウント削除ボタンを押した際の処理
   * 
   * @param action アクション 
   */
  _onDeleteAccountButtonPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await Promise.all([
        pop(this._deleteAccountButton),
        this._pushButton.play(),
      ]);
      this._deleteAccount.next();
    }); 
  }

  /**
   * 閉じるボタンを押した際の処理
   * 
   * @param action アクション 
   */
  _onCloseButtonPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await Promise.all([
        pop(this._closeButton),
        this._changeValue.play()
      ]);
      this._closeDialog.next();
    });
  }
}