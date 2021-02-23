// @flow

/**
 * レンダラのHTML要素を取得する
 */
export interface RendererDomGetter {
  /**
   * three.jsレンダラのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRendererDOM(): HTMLElement;
}