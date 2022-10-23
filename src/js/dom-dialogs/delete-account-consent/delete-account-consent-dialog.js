// @flow

import { Howl } from "howler";

import { pop } from "../../dom/animation";
import type { PushDOM } from "../../dom/event-stream";
import { pushDOMStream } from "../../dom/event-stream";
import { Exclusive } from "../../exclusive/exclusive";
import type { Resources } from "../../resource";
import { PathIds } from "../../resource/path";
import { SOUND_IDS } from "../../resource/sound";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import { domUuid } from "../../uuid/dom-uuid";
import type { DOMDialog } from "../dialog";

/** ルート要素 class属性 */
const ROOT_CLASS = "delete-account-consent";

/** data-idを集めたもの */
type DataIDs = {
  backGround: string,
  closer: string,
  closeButton: string,
  deleteAccountButton: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, resources: Resources): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
    <div class="${ROOT_CLASS}__dialog">
      <div class="${ROOT_CLASS}__caption">
        <div>アカウント削除をすると、</div>
        <div>ネット対戦が出来なくなります。</div>
        <div>本当にアカウント削除しますか？</div>
      </div>
      <div class="${ROOT_CLASS}__controllers">
        <button class="${ROOT_CLASS}__close" data-id="${ids.closeButton}">閉じる</button>
        <button class="${ROOT_CLASS}__delete-account" data-id="${ids.deleteAccountButton}">アカウント削除</buton>
      </div>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  backGround: HTMLElement,
  closer: HTMLImageElement,
  closeButton: HTMLButtonElement,
  deleteAccountButton: HTMLButtonElement,
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
  const closer =
    closerElement instanceof HTMLImageElement
      ? closerElement
      : document.createElement("img");
  const backGround =
    root.querySelector(`[data-id="${ids.backGround}"]`) ??
    document.createElement("div");
  const deleteAccountButtonElement = root.querySelector(
    `[data-id="${ids.deleteAccountButton}"]`
  );
  const deleteAccountButton =
    deleteAccountButtonElement instanceof HTMLButtonElement
      ? deleteAccountButtonElement
      : document.createElement("button");
  const closeButtonElement = root.querySelector(
    `[data-id="${ids.closeButton}"]`
  );
  const closeButton =
    closeButtonElement instanceof HTMLButtonElement
      ? closeButtonElement
      : document.createElement("button");
  return { closer, backGround, deleteAccountButton, closeButton };
}

/** アカウント削除同意ダイアログ */
export class DeleteAccountConsentDialog implements DOMDialog {
  #root: HTMLElement;
  #backGround: HTMLElement;
  #closer: HTMLImageElement;
  #deleteAccountButton: HTMLButtonElement;
  #closeButton: HTMLButtonElement;
  #deleteAccount: StreamSource<void>;
  #closeDialog: StreamSource<void>;
  #unsubscribers: Unsubscriber[];
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;
  #exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {
      backGround: domUuid(),
      closer: domUuid(),
      deleteAccountButton: domUuid(),
      closeButton: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.innerHTML = rootInnerHTML(ids, resources);
    this.#root.className = ROOT_CLASS;

    const elements = extractElements(this.#root, ids);
    this.#backGround = elements.backGround;
    this.#closer = elements.closer;
    this.#deleteAccountButton = elements.deleteAccountButton;
    this.#closeButton = elements.closeButton;

    this.#deleteAccount = createStreamSource();
    this.#closeDialog = createStreamSource();
    this.#unsubscribers = [
      pushDOMStream(this.#backGround).subscribe((action) => {
        this.#onPushOutsideOfDialog(action);
      }),
      pushDOMStream(this.#closer).subscribe((action) => {
        this.#onCloserPush(action);
      }),
      pushDOMStream(this.#deleteAccountButton).subscribe((action) => {
        this.#onDeleteAccountButtonPush(action);
      }),
      pushDOMStream(this.#closeButton).subscribe((action) => {
        this.#onCloseButtonPush(action);
      }),
    ];

    this.#changeValue =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl();
    this.#pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl();
    this.#exclusive = new Exclusive();
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アカウント削除通知
   *
   * @return 通知ストリーム
   */
  deleteAccountNotifier(): Stream<void> {
    return this.#deleteAccount;
  }

  /**
   * ダイアログを閉じる通知
   *
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this.#closeDialog;
  }

  /**
   * ダイアログ外を押した際の処理
   *
   * @param action アクション
   */
  #onPushOutsideOfDialog(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.stopPropagation();
      await this.#changeValue.play();
      this.#closeDialog.next();
    });
  }

  /**
   * クローザを押した際の処理
   *
   * @param action アクション
   */
  #onCloserPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await Promise.all([pop(this.#closer, 1.3), this.#changeValue.play()]);
      this.#closeDialog.next();
    });
  }

  /**
   * アカウント削除ボタンを押した際の処理
   *
   * @param action アクション
   */
  #onDeleteAccountButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await Promise.all([
        pop(this.#deleteAccountButton),
        this.#pushButton.play(),
      ]);
      this.#deleteAccount.next();
    });
  }

  /**
   * 閉じるボタンを押した際の処理
   *
   * @param action アクション
   */
  #onCloseButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await Promise.all([pop(this.#closeButton), this.#changeValue.play()]);
      this.#closeDialog.next();
    });
  }
}
