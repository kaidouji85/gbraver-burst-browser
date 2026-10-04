/**
 * HTML要素オンリーシーン
 */
export interface DOMScene {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement;
}
