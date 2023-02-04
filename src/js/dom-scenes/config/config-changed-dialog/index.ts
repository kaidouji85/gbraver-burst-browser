import type { Resources } from "../../../resource";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import { ROOT_CLASS, ROOT_CLASS_INVISIBLE } from "./dom/class-name";
import { bindEventListeners } from "./listeners";
import type { ConfigChangedDialogProps } from "./props";
import { createConfigChangedDialogProps } from "./props";

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
    this.#unsbusscriber = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsbusscriber.forEach((v) => {
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
  notifyClosed(): Stream<void> {
    return this.#props.closeStream;
  }

  /**
   * 設定変更受け入れ通知
   *
   * @return 通知ストリーム
   */
  notifyAcceptance(): Stream<void> {
    return this.#props.acceptStream;
  }

  /**
   * 設定変更破棄通知
   *
   * @return 通知ストリーム
   */
  notifyDiscard(): Stream<void> {
    return this.#props.discardStream;
  }
}
