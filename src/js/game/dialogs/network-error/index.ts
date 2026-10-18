import { Observable, Unsubscribable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../sounds/se/se-player";
import type { PostNetworkError } from "../../post-network-error";
import type { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createNetworkErrorDialogProps,
  CreateNetworkErrorDialogPropsOptions,
} from "./procedure/create-network-error-dialog-props";
import { NetworkErrorDialogProps } from "./props";

/** コンストラクタのオプション */
export type NetworkErrorDialogOptions = ResourcesContainer &
  SEPlayerContainer &
  CreateNetworkErrorDialogPropsOptions;

/** 通信エラー ダイアログ */
export class NetworkErrorDialog implements DOMDialog {
  /** プロパティ */
  #props: NetworkErrorDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: NetworkErrorDialogOptions) {
    this.#props = createNetworkErrorDialogProps(options);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ルートのHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 通信エラー後処理の実行タイミングを通知する
   * @returns 通知ストリーム
   */
  notifyPostNetworkError(): Observable<PostNetworkError> {
    return this.#props.postNetworkErrorSource;
  }
}
