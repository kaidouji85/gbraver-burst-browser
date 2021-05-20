// @flow

import type {ResourceRoot} from "./resource-root";

// TODO stories直下に移動させる
/**
 * storybookのリソースフォルダのルートパス
 */
export class StorybookResourceRoot implements ResourceRoot {
  /**
   * リソースベースパスを取得する
   *
   *  @return 取得結果
   */
  get(): string {
    return "";
  }
}