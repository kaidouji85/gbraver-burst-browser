// @flow

/**
 * プレイヤーセレクト
 */
export class PlayerSelect {
  /**
   * コンストラクタ
   *
   * @param dom 本シーンを追加するHTML要素
   */
  constructor(dom: HTMLElement) {
    dom.innerHTML = `
      <div>
        プレイヤーセレクト
      </div>
    `;
  }
}
