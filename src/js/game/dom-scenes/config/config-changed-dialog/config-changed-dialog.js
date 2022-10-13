// @flow
import {Howl} from "howler";
import {pop} from "../../../../dom/animation";
import type {PushDOM} from "../../../../dom/event-stream";
import {pushDOMStream} from "../../../../dom/event-stream";
import {Exclusive} from "../../../../exclusive/exclusive";
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../../stream/stream";
import {createStreamSource} from "../../../../stream/stream";
import {domUuid} from "../../../../uuid/dom-uuid";
import {ROOT_CLASS, ROOT_CLASS_INVISIBLE} from "./dom/class-name";
import {extractElements} from "./dom/elements";
import {rootInnerHTML} from "./dom/root-inner-html";

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