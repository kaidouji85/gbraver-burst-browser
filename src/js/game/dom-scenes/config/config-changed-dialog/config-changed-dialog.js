// @flow
import {pop} from "../../../../dom/animation";
import type {PushDOM} from "../../../../dom/event-stream";
import {pushDOMStream} from "../../../../dom/event-stream";
import type {Resources} from "../../../../resource";
import type {Stream, Unsubscriber} from "../../../../stream/stream";
import {ROOT_CLASS, ROOT_CLASS_INVISIBLE} from "./dom/class-name";
import type {ConfigChangedDialogProps} from "./props";
import {createConfigChangedDialogProps} from "./props";

/**
 * 設定変更通知ダイアログ
 * 本ダイアログは設定画面から呼び出されることを想定している
 */
export class ConfigChangedDialog {
  #props: ConfigChangedDialogProps;
  #unsbusscriber: Unsubscriber[];

  /**
   * コンストラクタ
   * 本ダイアログは生成直後には非表示である
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createConfigChangedDialogProps(resources);
    this.#unsbusscriber = [
      pushDOMStream(this.#props.backGround).subscribe(action => {
        this.#onBackGroundPush(action);
      }),
      pushDOMStream(this.#props.closer).subscribe(action => {
        this.#onCloserPush(action);
      }),
      pushDOMStream(this.#props.discard).subscribe(action => {
        this.#onDiscardPush(action)
      }),
      pushDOMStream(this.#props.accept).subscribe(action => {
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
    this.#props.root.className = ROOT_CLASS;
  }

  /**
   * ダイアログを非表示にする
   */
  hidden(): void {
    this.#props.root.className = ROOT_CLASS_INVISIBLE;
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ダイアログ閉じる通知
   *
   * @return 通知ストリーム
   */
  closeNotifier(): Stream<void> {
    return this.#props.closeStream;
  }

  /**
   * 設定変更受け入れ通知
   *
   * @return 通知ストリーム
   */
  acceptNotifier(): Stream<void> {
    return this.#props.acceptStream;
  }

  /**
   * 設定変更破棄通知
   *
   * @return 通知ストリーム
   */
  discardNotifier(): Stream<void> {
    return this.#props.discardStream;
  }

  /**
   * 背景を押した時の処理
   *
   * @param action アクション
   */
  #onBackGroundPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#props.exclusive.execute(async () => {
      await this.#props.changeValue.play();
      this.#props.closeStream.next();
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
    this.#props.exclusive.execute(async () => {
      await Promise.all([
        pop(this.#props.closer, 1.3),
        this.#props.changeValue.play()
      ]);
      this.#props.closeStream.next();
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
    this.#props.exclusive.execute(async () => {
      await Promise.all([
        pop(this.#props.discard),
        this.#props.changeValue.play()
      ]);
      this.#props.discardStream.next();
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
    this.#props.exclusive.execute(async () => {
      await Promise.all([
        pop(this.#props.accept),
        this.#props.pushButton.play()
      ]);
      this.#props.acceptStream.next();
    });
  }
}