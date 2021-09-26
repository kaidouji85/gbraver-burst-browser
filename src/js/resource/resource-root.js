// @flow

/** リソースフォルダのルートパス */
export interface ResourceRoot {
  /**
   * リソースルートのパスを取得する
   *
   *  @return 取得結果
   */
  get(): string;
}