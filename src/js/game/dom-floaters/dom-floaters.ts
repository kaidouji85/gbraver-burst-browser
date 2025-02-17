import { Observable, Subject, Unsubscribable } from "rxjs";

import { GameAction } from "../game-actions";
import { DomFloaterActionConnector } from "./dom-floater-action-connector";
import { PostBattleFloater, ShowParams } from "./post-battle/post-battle";

/** コンストラクタのパラメータ */
type DOMFloatersParams = {
  /** バトル終了後行動選択フローターのアクションコネクタ */
  postBattleConnector: DomFloaterActionConnector<PostBattleFloater>;
};

/** showPostBattleメソッドのパラメータ */
type ShowPostBattleParams = ShowParams;

/** DOMフローター管理オブジェクト */
export class DOMFloaters {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** バトル終了後行動選択フローター */
  #postBattle: PostBattleFloater;
  /** ゲームアクションストリーム */
  #gameAction: Subject<GameAction>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: DOMFloatersParams) {
    this.#root = document.createElement("div");
    this.#gameAction = new Subject();
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
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ゲームアクション通知
   * @returns 通知ストリーム
   */
  gameActionNotifier(): Observable<GameAction> {
    return this.#gameAction;
  }

  /**
   * バトル終了後行動選択フローターをアニメ付きで表示する
   * @param params パラメータ
   * @returns アニメが完了したら発火するPromise
   */
  async showPostBattle(params: ShowPostBattleParams): Promise<void> {
    await this.#postBattle.show(params);
  }

  /**
   * バトル終了後行動選択フローターを非表示にする
   */
  hiddenPostBattle(): void {
    this.#postBattle.hidden();
  }
}
