// @flow

import type {ResourceRoot} from "./resource-root";

/**
 * 製品 リソースフォルダのルートパス
 */
export class ProductionResourceRoot implements ResourceRoot {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string {
    return GBRAVER_BURST_RESOURCE_HASH;
  }
}
