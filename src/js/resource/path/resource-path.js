// @flow

/**
 * リソースのベースパス
 */
export interface ResourcePath {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string;
}