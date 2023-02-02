import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import { Stream, Unsubscriber } from "../../stream/stream";
import { DOMDialog } from "../dialog";
import { onCasualMatchSelect } from "./listeners/on-casual-match-select";
import { onPrivateMatchSelect } from "./listeners/on-private-match-select";
import { createNetBattleSelectrProps, NetBattleSelectrProps } from "./props";
import {onCloserPush} from "./listeners/on-closer-push";

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
      pushDOMStream(this.#props.privateMatchButton).subscribe((action) =>
        onPrivateMatchSelect(this.#props, action)
      ),
      pushDOMStream(this.#props.closer).subscribe(action => onCloserPush(this.#props, action))
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
   * プライベートマッチを選択したことを通知する
   * @return 通知ストリーム
   */
  notifyPrivateMatchSelection(): Stream<void> {
    return this.#props.privateMatchSelection;
  }

  /**
   * ダイアログクローズを通知する
   * @return 通知ストリーム
   */
  notifyDialogClosed(): Stream<void> {
    return this.#props.dialogClosed;
  }
}
