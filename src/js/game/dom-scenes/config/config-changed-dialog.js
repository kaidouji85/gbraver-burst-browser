// @flow
import {Howl} from "howler";
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
  accept: HTMLElement,
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
  const accept = root.querySelector(`[data-id="${ids.accept}"]`) ?? document.createElement('div');
  return {backGround, closer, discard, accept};
}

/** 
 * 設定変更通知ダイアログ
 * 本ダイアログは設定画面から呼び出されることを想定している
 */
export class ConfigChangedDialog {
  #root: HTMLElement;
  #backGround: HTMLElement;
  #closer: HTMLElement;
  #discard: HTMLElement;
  #accept: HTMLElement;
  #exclusive: Exclusive;
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;
  #closeStream: StreamSource<void>;
  #acceptStream: StreamSource<void>;
  #discardStream: StreamSource<void>;
  #unsbusscriber: Unsubscriber[];

  /**
   * コンストラクタ
   * 本ダイアログは生成直後には非表示である
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {backGround: domUuid(), closer: domUuid(), discard: domUuid(), accept: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS_INVISIBLE;
    this.#root.innerHTML = rootInnerHTML(resources, ids);

    const elements = extractElements(this.#root, ids);
    this.#backGround = elements.backGround;
    this.#closer = elements.closer;
    this.#discard = elements.discard;
    this.#accept = elements.accept;

    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
    this.#changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();

    this.#exclusive = new Exclusive();
    this.#closeStream = createStreamSource();
    this.#acceptStream = createStreamSource();
    this.#discardStream = createStreamSource();
    this.#unsbusscriber = [
      pushDOMStream(this.#backGround).subscribe(action => {
        this.#onBackGroundPush(action);
      }),
      pushDOMStream(this.#closer).subscribe(action => {
        this.#onCloserPush(action);
      }),
      pushDOMStream(this.#discard).subscribe(action => {
        this.#onDiscardPush(action)
      }),
      pushDOMStream(this.#accept).subscribe(action => {
        this.#onAcceptPush(action);
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsbusscriber.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ダイアログを表示する
   */
  show(): void {
    this.#root.className = ROOT_CLASS;
  }

  /**
   * ダイアログを非表示にする
   */
  hidden(): void {
    this.#root.className = ROOT_CLASS_INVISIBLE;
  }

  /**
   * ルートのHTML要素を取得する
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
  closeNotifier(): Stream<void> {
    return this.#closeStream;
  }

  /**
   * 設定変更受け入れ通知
   *
   * @return 通知ストリーム
   */
  acceptNotifier(): Stream<void> {
    return this.#acceptStream;
  }

  /**
   * 設定変更破棄通知
   *
   * @return 通知ストリーム
   */
  discardNotifier(): Stream<void> {
    return this.#discardStream;
  }

  /**
   * 背景を押した時の処理
   *
   * @param action アクション
   */
  #onBackGroundPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      await this.#changeValue.play();
      this.#closeStream.next();
    });
  }

  /**
   * クロージャを押した時の処理
   *
   * @param action アクション
   */
  #onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      await Promise.all([
        pop(this.#closer, 1.3),
        this.#changeValue.play()
      ]);
      this.#closeStream.next();
    });
  }

  /**
   * 破棄ボタンを押した時の処理
   *
   * @param action アクション
   */
  #onDiscardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      await Promise.all([
        pop(this.#discard),
        this.#changeValue.play()
      ]);
      this.#discardStream.next();
    });
  }

  /**
   * 設定変更受け入れボタンを押した時の処理
   *
   * @param action アクション
   */
  #onAcceptPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      await Promise.all([
        pop(this.#accept),
        this.#pushButton.play()
      ]);
      this.#acceptStream.next();
    });
  }
}