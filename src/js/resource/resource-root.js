// @flow

/** リソースフォルダのルートパス */
export interface ResourceRoot {
  /**
   * リソースルートのパスを朱徳する
   *
   *  @return 取得結果
   */
  get(): string;
}