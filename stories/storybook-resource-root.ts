import type { ResourceRoot } from "../src/js/resource/resource-root";

/**
 * storybookのリソースフォルダのルートパス
 */
export class StorybookResourceRoot implements ResourceRoot {
  /**
   * リソースベースパスを取得する
   *
   *  @returns 取得結果
   */
  get(): string {
    return "";
  }
}
