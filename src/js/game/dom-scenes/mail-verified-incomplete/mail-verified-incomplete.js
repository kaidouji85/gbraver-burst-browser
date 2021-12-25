// @flow

import type {DOMScene} from "../dom-scene";
import {escapeHTML} from "../../../dom/escape/escape-html";
import {domUuid} from "../../../uuid/dom-uuid";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import type {PushDOM} from "../../../dom/push/push-dom";
import {Exclusive} from "../../../exclusive/exclusive";
import {pop} from "../../../dom/animation/pop";
import {RxjsStreamSource} from "../../../stream/rxjs";

/** ルート要素 class属性 */
const ROOT_CLASS = 'mail-verified-incomplete';

/** data-idを集めたもの */
type DataIDs = {
  gotoTitle: string,
  reload: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param mailAddress メールアドレス
 * @return ルート要素innerHTML
 */
function rootInnerHTML(ids: DataIDs, mailAddress: string): string {
  const escapedMailAddress = escapeHTML(mailAddress);
  return `
    <div class="${ROOT_CLASS}__title">メール認証を完了させてください</div>
    <div class="${ROOT_CLASS}__caption">以下手順でメール認証を完了させてから、ゲームを開始してください</div>
    <ol class="${ROOT_CLASS}__procedure">
      <li class="${ROOT_CLASS}__procedure__item">${escapedMailAddress}に送信された認証メールを開く</li>
      <li class="${ROOT_CLASS}__procedure__item">認証メールに記載されたVerify Linkを開く</li>
      <li class="${ROOT_CLASS}__procedure__item">Gブレイバーバーストを再読み込みする</li>
    </ol>
    <div class="${ROOT_CLASS}__controllers">
      <button class="${ROOT_CLASS}__controllers__goto-title" data-id="${ids.gotoTitle}">タイトルへ</button>
      <button class="${ROOT_CLASS}__controllers__reload" data-id="${ids.reload}">再読み込み</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  gotoTitle: HTMLElement,
  reload: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const gotoTitle = root.querySelector(`[data-id="${ids.gotoTitle}"]`) ?? document.createElement('div');
  const reload = root.querySelector(`[data-id="${ids.reload}"]`) ?? document.createElement('div');
  return {gotoTitle, reload};
}

/** メール認証未完了画面 */
export class MailVerifiedIncomplete implements DOMScene {
  _root: HTMLElement;
  _gotoTitleButton: HTMLElement;
  _reloadButton: HTMLElement;
  _gotoTitle: StreamSource<void>;
  _reload: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param mailAddress 認証メール送信先アドレス
   */
  constructor(mailAddress: string): void {
    const ids = {gotoTitle: domUuid(), reload: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(ids, mailAddress);

    const elements = extractElements(this._root, ids);
    this._gotoTitleButton = elements.gotoTitle;
    this._reloadButton = elements.reload;

    this._unsubscribers = [
      pushDOMStream(this._gotoTitleButton).subscribe(action => {
        this._onGotoTitleButtonPush(action);
      }),
      pushDOMStream(this._reloadButton).subscribe(action => {
        this._onReloadButtonPush(action);
      }),
    ];

    this._gotoTitle = new RxjsStreamSource();
    this._reload = new RxjsStreamSource();
    this._exclusive = new Exclusive();
  }

  /** @override */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /** @override  */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * タイトル遷移通知
   *
   * @return 通知ストリーム
   */
  gotoTitleNotifier(): Stream<void> {
    return this._gotoTitle;
  }

  /**
   * 再読み込み通知
   *
   * @return 通知ストリーム
   */
  reloadNotifier(): Stream<void> {
    return this._reload;
  }

  /**
   * タイトルへボタンが押された時の処理
   *
   * @param action アクション
   */
  _onGotoTitleButtonPush(action: PushDOM): void {
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(this._gotoTitleButton);
      this._gotoTitle.next();
    });
  }

  /**
   * 再読み込みボタンが押された時の処理
   *
   * @param action アクション
   */
  _onReloadButtonPush(action: PushDOM): void {
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(this._reloadButton);
      this._reload.next();
    });
  }
}