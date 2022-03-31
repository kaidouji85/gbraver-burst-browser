// @flow
import {PostNPCBattleWinFloater} from "./post-npc-battle-win/post-npc-battle-win";

/** DOMフローター管理オブジェクト */
export class DOMFloaters {
  _root: HTMLElement;
  _postNPCBattleWin: PostNPCBattleWinFloater;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._postNPCBattleWin = new PostNPCBattleWinFloater();
    this._root.appendChild(this._postNPCBattleWin.getRootHTMLElement());
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