import { Observable, Unsubscribable } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../sounds/se/se-player";
import type { PostNetworkError } from "../../post-network-error";
import type { DOMDialog } from "../dialog";
import { createNetworkErrorDialogProps } from "./procedure/create-network-error-dialog-props";
import { NetworkErrorDialogProps } from "./props";

/** コンストラクタのオプション */
export type NetworkErrorDialogOptions = ResourcesContainer &
  SEPlayerContainer & {
    /** 通信エラーの後処理 */
    postNetworkError: PostNetworkError;
  };

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
    this.#unsubscribers = [
      domPushStream(this.#props.postNetworkErrorButton).subscribe((action) => {
        this.#onPostNetworkErrorButtonPush(action);
      }),
    ];
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

  /**
   * 通信エラー後処理ボタンを押した時の処理
   * @param action アクション
   */
  #onPostNetworkErrorButtonPush(action: PushDOM): void {
    this.#props.exclusive.execute(async () => {
      action.event.preventDefault();
      this.#props.se.play(this.#props.pushButtonSound);
      await pop(this.#props.postNetworkErrorButton);
      this.#props.postNetworkErrorSource.next(this.#props.postNetworkError);
    });
  }
}
