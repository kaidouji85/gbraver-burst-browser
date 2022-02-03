// @flow
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {domUuid} from "../../../uuid/dom-uuid";
import type { Stream, StreamSource, Unsubscriber } from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import type {PushDOM} from "../../../dom/push/push-dom";
import {Exclusive} from "../../../exclusive/exclusive";
import {pushDOMStream} from "../../../dom/push/push-dom";
import {pop} from "../../../dom/animation/pop";

/** ルート要素のclass属性 */
const ROOT_CLASS = 'config-changed';

/** ルート要素非表示時のclass属性 */
const ROOT_CLASS_INVISIBLE = `${ROOT_CLASS}--invisible`;

/** data-idを集めたもの */
type DataIDs = {
  backGround: string,
  closer: string,
  discard: string,
  accept: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param resources リソース管理オブジェクト
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__dialog__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <span class="${ROOT_CLASS}__dialog__caption">設定が変更されています</span>
      <div class="${ROOT_CLASS}__dialog__controllers">
        <button class="${ROOT_CLASS}__dialog__controllers__discard" data-id="${ids.discard}">設定変更を破棄</button>
        <button class="${ROOT_CLASS}__dialog__controllers__accept" data-id="${ids.accept}">この設定にする</button>
      </div>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  backGround: HTMLElement,
  closer: HTMLElement,
  discard: HTMLElement,
  accpet: HTMLElement,
}

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const backGround = root.querySelector(`[data-id="${ids.backGround}"]`) ?? document.createElement('div');
  const closer = root.querySelector(`[data-id="${ids.closer}"]`) ?? document.createElement('div');
  const discard = root.querySelector(`[data-id="${ids.discard}"]`) ?? document.createElement('div');
  const accpet = root.querySelector(`[data-id="${ids.accept}"]`) ?? document.createElement('div');
  return {backGround, closer, discard, accpet};
}

/** 設定変更通知ダイアログ */
export class ConfigChangedDialog {
  _root: HTMLElement;
  _backGround: HTMLElement;
  _closer: HTMLElement;
  _discard: HTMLElement;
  _accept: HTMLElement;
  _exclusive: Exclusive;
  _closeStream: StreamSource<void>;
  _acceptStream: StreamSource<void>;
  _discardStream: StreamSource<void>;
  _unsbusscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {backGround: domUuid(), closer: domUuid(), discard: domUuid(), accept: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_INVISIBLE;
    this._root.innerHTML = rootInnerHTML(resources, ids);

    const elements = extractElements(this._root, ids);
    this._backGround = elements.backGround;
    this._closer = elements.closer;
    this._discard = elements.discard;
    this._accept = elements.accpet;

    this._exclusive = new Exclusive();
    this._closeStream = new RxjsStreamSource();
    this._acceptStream = new RxjsStreamSource();
    this._discardStream = new RxjsStreamSource();
    this._unsbusscriber = [
      pushDOMStream(this._backGround).subscribe(action => {
        this._onBackGroundPush(action);
      }),
      pushDOMStream(this._closer).subscribe(action => {
        this._onCloserPush(action);
      }),
      pushDOMStream(this._discard).subscribe(action => {
        this._onDiscardPush(action)
      }),
      pushDOMStream(this._accept).subscribe(action => {
        this._onAcceptPush(action);
      })
    ];
  }

   /**
    * デストラクタ相当の処理
    */
  destructor(): void {
    this._unsbusscriber.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ダイアログを表示する
   */
  show(): void {
    this._root.className = ROOT_CLASS;
  }

  /**
   * ダイアログを非表示にする
   */
  hidden(): void {
    this._root.className = ROOT_CLASS_INVISIBLE;
  }

  /**
   * ルートのHTML要素を取得する
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
  closeNotifier(): Stream<void> {
    return this._closeStream;
  }

  /**
   * 設定変更受け入れ通知
   *
   * @return 通知ストリーム
   */
  acceptNotifer(): Stream<void> {
    return this._acceptStream;
  }

  /**
   * 設定変更破棄通知
   *
   * @return 通知ストリーム
   */
  discardNotifier(): Stream<void> {
    return this._discardStream;
  }

  /**
   * 背景を押した時の処理
   *
   * @param action アクション
   */
  _onBackGroundPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._closeStream.next();
    });
  }

  /**
   * クロージャを押した時の処理
   *
   * @param action アクション
   */
  _onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      await pop(this._closer, 1.3);
      this._closeStream.next();
    });
  }

  /**
   * 破棄ボタンを押した時の処理
   *
   * @param action アクション
   */
  _onDiscardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      await pop(this._discard);
      this._discardStream.next();
    });
  }

  /**
   * 設定変更受け入れボタンを押した時の処理
   *
   * @param action アクション
   */
  _onAcceptPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      await pop(this._accept);
      this._acceptStream.next();
    });
  }
}