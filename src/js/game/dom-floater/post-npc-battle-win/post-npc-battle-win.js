// @flow
import {waitFinishAnimation} from "../../../wait/wait-finish-animation";

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
   * 本クラスの初期表示は(display: none)である
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.style.display = 'none';
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

  /**
   * アニメーション付きでフローターを表示する
   * 
   * @return アニメーションが完了したら発火するPromise
   */
  async show(): Promise<void> {
    this._root.style.display = 'flex';
    const animation = this._root.animate([
      {transform: 'translate(-50%, 100%)'},
      {transform: 'translate(-50%, 0)'}
    ], {
      duration: 400,
      fill: "forwards",
      easing: 'ease'
    });
    await waitFinishAnimation(animation);
  }

  /**
   * フローターを非表示にする
   */
  hidden(): void {
    this._root.style.display = 'none';
  }
}