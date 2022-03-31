// @flow

/** ルートHTML要素のclass属性 */
const ROOT_CLASS = 'post-npc-battle-win';

/**
 * ルートHTML要素のinnerHTML
 * 
 * @return ルートHTML要素のinnerHTML
 */
export function rootInnerHTML(): string {
  return `
    <button class="${ROOT_CLASS}__goto-title">タイトルへ</button>
    <button class="${ROOT_CLASS}__next-stage">次のステージ</button>
  `;
}

/** NPCバトル勝利後フローター */
export class PostNPCBattleWinFloater {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}