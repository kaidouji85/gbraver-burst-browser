// @flow

import type {ResourcePath} from "./resource-path";

/**
 * storybookのリソースパス
 */
export class StorybookResourcePath implements ResourcePath {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string {
    return "";
  }
}