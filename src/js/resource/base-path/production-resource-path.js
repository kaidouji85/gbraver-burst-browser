// @flow

import type {ResourceBasePath} from "./resource-base-path";

/**
 * 製品 リソースベースパス
 */
export class ProductionResourcePath implements ResourceBasePath {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string {
    return GBRAVER_BURST_RESOURCE_HASH;
  }
}
