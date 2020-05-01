// @flow

/**
 * リソースのベースパス
 */
export interface ResourceBasePath {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string;
}