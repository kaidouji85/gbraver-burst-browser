/**
 * DOMダイアログ
 */
export interface DOMDialog {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * ルートHTML要素を取得する
   *
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement;
}
