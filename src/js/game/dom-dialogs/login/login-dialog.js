// @flow
import {Howl} from 'howler';
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {DOMDialog} from "../dialog";

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
      <div class="${ROOT_CLASS_NAME}__dialog__controllers">
        <button class="${ROOT_CLASS_NAME}__dialog__controllers__close" data-id="${ids.closeButton}">閉じる</button>
        <button class="${ROOT_CLASS_NAME}__dialog__controllers__login" data-id="${ids.loginButton}">ログイン</buton>
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

/** ログイン ダイアログ */
export class LoginDialog implements DOMDialog {
  #root: HTMLElement;
  #closer: HTMLImageElement;
  #loginButton: HTMLButtonElement;
  #closeButton: HTMLButtonElement;
  #closeDialog: StreamSource<void>;
  #login: StreamSource<void>;
  #unsubscribers: Unsubscriber[];
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;
  #exclusive: Exclusive;

  /** 
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   * @param caption 入力フォームに表示されるメッセージ
   */
  constructor(resources: Resources, caption: string) {
    const dataIDs = {closer: domUuid(), backGround: domUuid(), loginButton: domUuid(), closeButton: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs, resources, caption);

    const elements = extractElements(this.#root, dataIDs);
    this.#closer =elements.closer;
    this.#loginButton = elements.loginButton;
    this.#closeButton = elements.closeButton;

    this.#closeDialog = createStreamSource();
    this.#login = createStreamSource();
    this.#unsubscribers = [
      pushDOMStream(this.#loginButton).subscribe(action => {
        this.#onLoginButtonPush(action);
      }),
      pushDOMStream(this.#closeButton).subscribe(action => {
        this.#onCloseButtonPush(action);
      }),
      pushDOMStream(this.#closer).subscribe(action => {
        this.#onCloserPush(action);
      }),
      pushDOMStream(elements.backGround).subscribe(action => {
        this.#onPushOutsideOfDialog(action);
      }),
    ];

    this.#changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
    this.#exclusive = new Exclusive();
  }

  /**
   * デストラクタ相当の処理
   */
   destructor(): void {
     this.#unsubscribers.forEach(v => {
       v.unsubscribe();
     });
   }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ダイアログ閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this.#closeDialog;
  }

  /**
   * ログイン実行通知
   *
   * @return 通知ストリーム
   */
  loginNotifier(): Stream<void> {
    return this.#login;
  }

  /**
   * ログインボタンを押した時の処理
   * 
   * @param action アクション
   */
  #onLoginButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async () => {
      action.event.preventDefault();
      await Promise.all([
        pop(this.#loginButton),
        this.#pushButton.play()
      ]);
      this.#login.next();
    });
  }

  /**
   * 閉じるボタンを押した時の処理
   * 
   * @param action アクション
   */
  #onCloseButtonPush(action: PushDOM): void {
    this.#exclusive.execute(async () => {
      action.event.preventDefault();
      await Promise.all([
        pop(this.#closeButton),
        this.#changeValue.play()
      ]);
      this.#closeDialog.next();
    });
  }

  /**
   * クローザーを押した時の処理
   * 
   * @param action アクション
   */
  #onCloserPush(action: PushDOM): void {
    this.#exclusive.execute(async () => {
      action.event.preventDefault();
      await Promise.all([
        pop(this.#closer, 1.3),
        this.#changeValue.play()
      ]);
      this.#closeDialog.next();
    });
  }

  /**
   * ダイアログ外を押した時の処理
   * 
   * @param action アクション
   */
  #onPushOutsideOfDialog(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void>=> {
      action.event.preventDefault();
      await this.#changeValue.play();
      this.#closeDialog.next();
    });
  }
}