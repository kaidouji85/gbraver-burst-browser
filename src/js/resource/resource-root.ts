/** リソースフォルダのルートパス */
export interface ResourceRoot {
  /**
   * リソースルートのパスを取得する
   *
   *  @returns 取得結果
   */
  get(): string;
}
