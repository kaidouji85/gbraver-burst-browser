/** 3Dシーン */
export interface TDScene {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * DOMレイヤーが利用しているHTML要素を全て取得する
   *
   * @returns 取得結果
   */
  getDOMLayerElements(): HTMLElement[];
}
