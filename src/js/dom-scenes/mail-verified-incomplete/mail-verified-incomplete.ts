import { pop } from "../../dom/animation";
import { escapeHTML } from "../../dom/escape-html";
import type { PushDOM } from "../../dom/event-stream";
import { pushDOMStream } from "../../dom/event-stream";
import { Exclusive } from "../../exclusive/exclusive";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import { domUuid } from "../../uuid/dom-uuid";
import type { DOMScene } from "../dom-scene";

/** ルート要素 class属性 */
const ROOT_CLASS = "mail-verified-incomplete";

/** data-idを集めたもの */
type DataIDs = {
  gotoTitle: string;
  reload: string;
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
      <li class="${ROOT_CLASS}__operation">${escapedMailAddress}に送信された認証メールを開く</li>
      <li class="${ROOT_CLASS}__operation">認証メールに記載されたVerify Linkを開く</li>
      <li class="${ROOT_CLASS}__operation">Gブレイバーバーストを再読み込みする</li>
    </ol>
    <div class="${ROOT_CLASS}__controllers">
      <button class="${ROOT_CLASS}__goto-title" data-id="${ids.gotoTitle}">タイトルへ</button>
      <button class="${ROOT_CLASS}__reload" data-id="${ids.reload}">再読み込み</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  gotoTitle: HTMLElement;
  reload: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const gotoTitle: HTMLElement =
    root.querySelector(`[data-id="${ids.gotoTitle}"]`) ??
    document.createElement("div");
  const reload: HTMLElement =
    root.querySelector(`[data-id="${ids.reload}"]`) ??
    document.createElement("div");
  return {
    gotoTitle,
    reload,
  };
}

/** メール認証未完了画面 */
export class MailVerifiedIncomplete implements DOMScene {
  #root: HTMLElement;
  #gotoTitleButton: HTMLElement;
  #reloadButton: HTMLElement;
  #gotoTitle: StreamSource<void>;
  #reload: StreamSource<void>;
  #unsubscribers: Unsubscriber[];
  #exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param mailAddress 認証メール送信先アドレス
   */
  constructor(mailAddress: string) {
    const ids = {
      gotoTitle: domUuid(),
      reload: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids, mailAddress);
    const elements = extractElements(this.#root, ids);
    this.#gotoTitleButton = elements.gotoTitle;
    this.#reloadButton = elements.reload;
    this.#unsubscribers = [
      pushDOMStream(this.#gotoTitleButton).subscribe((action) => {
        this.#onGotoTitleButtonPush(action);
      }),
      pushDOMStream(this.#reloadButton).subscribe((action) => {
        this.#onReloadButtonPush(action);
      }),
    ];
    this.#gotoTitle = createStreamSource();
    this.#reload = createStreamSource();
    this.#exclusive = new Exclusive();
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override  */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * タイトル遷移通知
   *
   * @return 通知ストリーム
   */
  gotoTitleNotifier(): Stream<void> {
    return this.#gotoTitle;
  }

  /**
   * 再読み込み通知
   *
   * @return 通知ストリーム
   */
  reloadNotifier(): Stream<void> {
    return this.#reload;
  }

  /**
   * タイトルへボタンが押された時の処理
   *
   * @param action アクション
   */
  #onGotoTitleButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(this.#gotoTitleButton);
      this.#gotoTitle.next();
    });
  }

  /**
   * 再読み込みボタンが押された時の処理
   *
   * @param action アクション
   */
  #onReloadButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(this.#reloadButton);
      this.#reload.next();
    });
  }
}
