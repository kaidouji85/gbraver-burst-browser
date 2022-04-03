// @flow
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import type {GameAction} from "../game-actions";
import {RxjsStreamSource} from "../../stream/rxjs";
import {PostNPCBattleWinFloater} from "./post-npc-battle-win/post-npc-battle-win";

/** DOMフローター管理オブジェクト */
export class DOMFloaters {
  _root: HTMLElement;
  _postNPCBattleWin: PostNPCBattleWinFloater;
  _gameAction: StreamSource<GameAction>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._gameAction = new RxjsStreamSource();

    this._postNPCBattleWin = new PostNPCBattleWinFloater();
    this._root.appendChild(this._postNPCBattleWin.getRootHTMLElement());

    this._unsubscribers = [
      this._postNPCBattleWin.selectionCompleteNotifier().subscribe(postBattle => {
        this._gameAction.next({type: 'PostBattleAction', action: postBattle});
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._postNPCBattleWin.destructor();
  }

  /**
   * 本クラスのルートHTML要素を取得する
   * 
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * ゲームアクション通知
   * 
   * @return 通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this._gameAction;
  }

  /**
   * NPCバトル勝利後フローターをアニメ付きで表示する
   * 
   * @return アニメが完了したら発火するPromise
   */
  async showPostNPCBattleWin(): Promise<void> {
    await this._postNPCBattleWin.show();
  }

  /**
   * NPCバトル勝利後フローターを非表示にする
   */
  hiddenPostNPCBattleWin(): void {
    this._postNPCBattleWin.hidden();
  }
}