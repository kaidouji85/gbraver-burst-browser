import { pushDOMStream } from "../../dom/event-stream";
import { Resources } from "../../resource";
import {Stream, Unsubscriber} from "../../stream/stream";
import { DOMDialog } from "../dialog";
import { onCasualMatchPush } from "./listeners/on-casual-match-push";
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
        onCasualMatchPush(this.#props, action)
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
    return this.#props.selectCasualMatch;
  }
}
