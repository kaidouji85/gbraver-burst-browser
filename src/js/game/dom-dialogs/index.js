// @flow

import type { Resources } from "../../resource";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameAction } from "../game-actions";
import type { PostNetworkError } from "../post-network-error";
import type { DomDialogActionConnector } from "./action-connector/dom-dialog-action-connector";
import { DeleteAccountConsentDialog } from "./delete-account-consent/delete-account-consent-dialog";
import type { DOMDialog } from "./dialog";
import { DifficultyDialog } from "./difficulty/difficulty-dialog";
import { MatchingDialog } from "./matching/matching-dialog";
import { NetworkErrorDialog } from "./network-error/network-error-dialog";

/** HTML ダイアログをあつめたもの */
export class DOMDialogs {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** 現在表示しているダイアログ、何も表示していない場合はnullがセットされる */
  #dialog: ?DOMDialog;
  /** ゲームアクションストリーム */
  #gameAction: StreamSource<GameAction>;
  /** 案サブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
    this.#dialog = null;
    this.#gameAction = createStreamSource();
    this.#unsubscribers = [];
  }

  /**
   * DOMダイアログをバインドする
   *
   * @template X ダイアログデータ型
   * @param dialog ダイアログ
   * @param connector アクションコネクタ
   */
  bind<X: DOMDialog>(dialog: X, connector: DomDialogActionConnector<X>): void {
    this.#removeCurrentDialog();
    this.#unsubscribers = connector(dialog, this.#gameAction);
    this.#root.appendChild(dialog.getRootHTMLElement());
    this.#dialog = dialog;
  }

  /**
   * @deprecated
   * 通信エラーダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   * @param postNetworkError 通信エラーの後処理情報
   */
  startNetworkError(
    resources: Resources,
    postNetworkError: PostNetworkError
  ): void {
    this.#removeCurrentDialog();

    const networkError = new NetworkErrorDialog(resources, postNetworkError);
    this.#unsubscribers = [
      networkError.postNetworkErrorNotifier().subscribe((postNetworkError) => {
        this.#gameAction.next({ type: "EndNetworkError", postNetworkError });
      }),
    ];
    this.#root.appendChild(networkError.getRootHTMLElement());
    this.#dialog = networkError;
  }

  /**
   * @deprecated
   * アカウント削除同意ダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   */
  startDeleteAccountConsent(resources: Resources): void {
    this.#removeCurrentDialog();

    const deleteAccountConsent = new DeleteAccountConsentDialog(resources);
    this.#unsubscribers = [
      deleteAccountConsent.deleteAccountNotifier().subscribe(() => {
        this.#gameAction.next({ type: "DeleteAccount" });
      }),
      deleteAccountConsent.closeDialogNotifier().subscribe(() => {
        this.#gameAction.next({ type: "CancelAccountDeletion" });
      }),
    ];
    this.#root.appendChild(deleteAccountConsent.getRootHTMLElement());
    this.#dialog = deleteAccountConsent;
  }

  /**
   * @deprecated
   * 難易度選択ダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   */
  startDifficulty(resources: Resources): void {
    this.#removeCurrentDialog();

    const degreeOfDifficulty = new DifficultyDialog(resources);
    this.#unsubscribers = [
      degreeOfDifficulty.selectionCompleteNotifier().subscribe((difficulty) => {
        this.#gameAction.next({
          type: "DifficultySelectionComplete",
          difficulty,
        });
      }),
      degreeOfDifficulty.closeDialogNotifier().subscribe(() => {
        this.#gameAction.next({ type: "DifficultySelectionCancel" });
      }),
    ];
    this.#root.appendChild(degreeOfDifficulty.getRootHTMLElement());
    this.#dialog = degreeOfDifficulty;
  }

  /**
   * @deprecated
   * マッチングダイアログを表示する
   *
   * @param resources リソース管理オブジェクト
   */
  startMatching(resources: Resources): void {
    this.#removeCurrentDialog();

    const matchingDialog = new MatchingDialog(resources);
    this.#unsubscribers = [
      matchingDialog.matchingCanceledNotifier().subscribe(() => {
        this.#gameAction.next({ type: "MatchingCanceled" });
      }),
    ];
    this.#root.appendChild(matchingDialog.getRootHTMLElement());
    this.#dialog = matchingDialog;
  }

  /**
   * 現在表示しているダイアログを非表示にする
   */
  hidden(): void {
    this.#removeCurrentDialog();
  }

  /**
   * ゲームアクション通知
   *
   * @return イベント通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this.#gameAction;
  }

  /**
   * 本クラスのルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 現在表示しているダイアログを取り除く
   */
  #removeCurrentDialog(): void {
    this.#dialog && this.#dialog.destructor();
    this.#dialog && this.#dialog.getRootHTMLElement().remove();
    this.#dialog = null;

    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#unsubscribers = [];
  }
}
