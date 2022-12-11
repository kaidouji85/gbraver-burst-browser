// @flow

import type { Resources } from "../../resource";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameAction } from "../game-actions";
import type { DomFloaterActionConnector } from "./dom-floater-action-connector";
import { PostBattleFloater } from "./post-battle/post-battle";
import type { PostBattleButtonConfig } from "./post-battle/post-battle-button-config";

/** コンストラクタのパラメータ */
type Params = {
  /** バトル終了後行動選択フローターのアクションコネクタ */
  postBattleConnector: DomFloaterActionConnector<PostBattleFloater>,
};

/** DOMフローター管理オブジェクト */
export class DOMFloaters {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** バトル終了後行動選択フローター */
  #postBattle: PostBattleFloater;
  /** ゲームアクションストリーム */
  #gameAction: StreamSource<GameAction>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: Params) {
    this.#root = document.createElement("div");
    this.#gameAction = createStreamSource();

    this.#postBattle = new PostBattleFloater();
    this.#root.appendChild(this.#postBattle.getRootHTMLElement());

    this.#unsubscribers = [
      ...params.postBattleConnector(this.#postBattle, this.#gameAction),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
    this.#postBattle.destructor();
  }

  /**
   * 本クラスのルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ゲームアクション通知
   * @return 通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this.#gameAction;
  }

  /**
   * バトル終了後行動選択フローターをアニメ付きで表示する
   * @param resources リソース管理オブジェクト
   * @param buttons アクションボタン設定
   * @return アニメが完了したら発火するPromise
   */
  async showPostBattle(
    resources: Resources,
    buttons: PostBattleButtonConfig[]
  ): Promise<void> {
    await this.#postBattle.show(resources, buttons);
  }

  /**
   * バトル終了後行動選択フローターを非表示にする
   */
  hiddenPostBattle(): void {
    this.#postBattle.hidden();
  }
}
