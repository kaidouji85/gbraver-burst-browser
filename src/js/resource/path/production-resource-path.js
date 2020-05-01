// @flow

import type {ResourcePath} from "./resource-path";

/**
 * 製品 リソースベースパス
 */
export class ProductionResourcePath implements ResourcePath {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string {
    return GBRAVER_BURST_RESOURCE_HASH;
  }
}
