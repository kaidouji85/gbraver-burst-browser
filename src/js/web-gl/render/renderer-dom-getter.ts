/**
 * レンダラのHTML要素を取得する
 */
export interface RendererDomGetter {
  /**
   * three.jsレンダラのHTML要素を取得する
   *
   * @returns 取得結果
   */
  getRendererDOM(): HTMLElement;
}
