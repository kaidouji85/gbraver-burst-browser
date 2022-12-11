// @flow

import type { Resources } from "../../resource";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameAction } from "../game-actions";
import type { DomFloaterActionConnector } from "./action-connector/dom-floater-action-connector";
import { PostBattleFloater } from "./post-battle/post-battle";
import type { PostBattleButtonConfig } from "./post-battle/post-battle-button-config";

/** 本クラスで扱う全フローターをまとめたもの */
type AllFloater = PostBattleFloater;

/** フローターに対応したアンサブスクライバ */
type FloaterUnsubscriber = {
  floater: AllFloater,
  unsubscriber: Unsubscriber,
};

/** DOMフローター管理オブジェクト */
export class DOMFloaters {
  #root: HTMLElement;
  #postBattle: PostBattleFloater;
  #gameAction: StreamSource<GameAction>;
  #unsubscribers: FloaterUnsubscriber[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
    this.#gameAction = createStreamSource();
    this.#unsubscribers = [];

    this.#postBattle = new PostBattleFloater();
    this.#root.appendChild(this.#postBattle.getRootHTMLElement());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach(({ unsubscriber }) => {
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
   * @param connector アクションコネクタ
   * @return アニメが完了したら発火するPromise
   */
  async showPostBattle(
    resources: Resources,
    buttons: PostBattleButtonConfig[],
    connector: DomFloaterActionConnector<PostBattleFloater>
  ): Promise<void> {
    this.#unsubscribe(this.#postBattle);
    await this.#postBattle.show(resources, buttons);
    this.#unsubscribers = connector(this.#postBattle, this.#gameAction).map(
      (unsubscriber) => ({
        unsubscriber,
        floater: this.#postBattle,
      })
    );
  }

  /**
   * バトル終了後行動選択フローターを非表示にする
   */
  hiddenPostBattle(): void {
    this.#unsubscribe(this.#postBattle);
    this.#postBattle.hidden();
  }

  /**
   * 指定したフローターをアンサブスクライブする
   * @param target フローター
   */
  #unsubscribe(target: AllFloater): void {
    this.#unsubscribers
      .filter(({ floater }) => floater === target)
      .forEach(({ unsubscriber }) => {
        unsubscriber.unsubscribe();
      });
    this.#unsubscribers = this.#unsubscribers.filter(
      ({ floater }) => floater !== target
    );
  }
}
