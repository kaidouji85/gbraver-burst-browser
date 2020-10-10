// @flow

import type {ResourceRoot} from "./resource-root";
import {DefinePlugin} from "../../webpack/define-plugin";

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
    return DefinePlugin.resourceHash;
  }
}
