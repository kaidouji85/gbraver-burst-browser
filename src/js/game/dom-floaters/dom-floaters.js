// @flow
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import type {GameAction} from "../game-actions";
import {RxjsStreamSource} from "../../stream/rxjs";
import {PostBattleFloater} from "./post-battle/post-battle";
import type {PostBattleButtonConfig} from "./post-battle/post-battle-button-config";
import type {Resources} from "../../resource";

/** DOMフローター管理オブジェクト */
export class DOMFloaters {
  _root: HTMLElement;
  _postBattle: PostBattleFloater;
  _gameAction: StreamSource<GameAction>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._gameAction = new RxjsStreamSource();

    this._postBattle = new PostBattleFloater();
    this._root.appendChild(this._postBattle.getRootHTMLElement());

    this._unsubscribers = [
      this._postBattle.selectionCompleteNotifier().subscribe(postBattle => {
        this._gameAction.next({type: 'PostBattleAction', action: postBattle});
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this._postBattle.destructor();
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
   * バトル終了後行動選択フローターをアニメ付きで表示する
   *
   * @param resources リソース管理オブジェクト
   * @param buttons アクションボタン設定
   * @return アニメが完了したら発火するPromise
   */
  async showPostBattle(resources: Resources, buttons: PostBattleButtonConfig[]): Promise<void> {
    await this._postBattle.show(resources, buttons);
  }

  /**
   * バトル終了後行動選択フローターを非表示にする
   */
  hiddenPostBattle(): void {
    this._postBattle.hidden();
  }
}