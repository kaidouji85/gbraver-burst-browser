// @flow

/**
 *  リロースフォルダのルートパス
 */
export interface ResourceRoot {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string;
}