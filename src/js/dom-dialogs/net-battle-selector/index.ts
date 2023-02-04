import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import { Stream, Unsubscriber } from "../../stream/stream";
import { DOMDialog } from "../dialog";
import { onBackgroundPush } from "./listeners/on-background-push";
import { onCasualMatchSelect } from "./listeners/on-casual-match-select";
import { onCloserPush } from "./listeners/on-closer-push";
import { onPrivateMatchGuestSelect } from "./listeners/on-private-match-guest-select";
import { onPrivateMatchHostSelect } from "./listeners/on-private-match-host-select";
import { createNetBattleSelectrProps, NetBattleSelectrProps } from "./props";

/** ネットバトルセレクター */
export class NetBattleSelector implements DOMDialog {
  /** プロパティ */
  #props: NetBattleSelectrProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createNetBattleSelectrProps(resources);
    this.#unsubscribers = [
      pushDOMStream(this.#props.casualMatchButton).subscribe((action) =>
        onCasualMatchSelect(this.#props, action)
      ),
      pushDOMStream(this.#props.privateMatchHostButton).subscribe((action) =>
        onPrivateMatchHostSelect(this.#props, action)
      ),
      pushDOMStream(this.#props.privateMatchGuestButton).subscribe((action) =>
        onPrivateMatchGuestSelect(this.#props, action)
      ),
      pushDOMStream(this.#props.closer).subscribe((action) =>
        onCloserPush(this.#props, action)
      ),
      pushDOMStream(this.#props.backGround).subscribe((action) =>
        onBackgroundPush(this.#props, action)
      ),
    ];
  }

  /** @override  */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * カジュアルマッチを選択したことを通知する
   * @return 通知ストリーム
   */
  notifyCasualMatchSelection(): Stream<void> {
    return this.#props.casualMatchSelection;
  }

  /**
   * プライベートマッチ（ホスト）を選択したことを通知する
   * @return 通知ストリーム
   */
  notifyPrivateMatchHostSelection(): Stream<void> {
    return this.#props.privateMatchHostSelection;
  }

  /**
   * プライベートマッチ（ゲスト）を選択したことを通知する
   * @return 通知ストリーム
   */
  notifyPrivateMatchGuestSelection(): Stream<void> {
    return this.#props.privateMatchGuestSelection;
  }

  /**
   * ダイアログクローズを通知する
   * @return 通知ストリーム
   */
  notifyClosed(): Stream<void> {
    return this.#props.dialogClosed;
  }
}
