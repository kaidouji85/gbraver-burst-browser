// @flow

import type {ResourcePath} from "../path/resource-path";

/**
 * タイトルロゴ URL
 * @param resourcePath リソースパス
 * @return URL
 */
export function titleLogoURL(resourcePath: ResourcePath): string {
  return `${resourcePath.get()}/logo.png`;
}

/**
 * タイトルバック URL
 * @param resourcePath リソースパス
 * @return URL
 */
export function titleBackURL(resourcePath: ResourcePath): string {
  return `${resourcePath.get()}/title-back.png`;
}