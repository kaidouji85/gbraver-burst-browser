import { PreLoadPathConfigs } from "../path/configs";
import type { ResourceRoot } from "../resource-root";
import {
  DEVELOPING_FULL_RESOURCE_CONFIGS,
  FULL_RESOURCE_CONFIGS,
} from "./full-resource-configs";
import { ResourceLoading, resourceLoading } from "./resource-loading";

/**
 * フルリソースを読み込む
 * @param resourceRoot リソースルート
 * @returns リソース読み込みオブジェクト
 */
export function fullResourceLoading(
  resourceRoot: ResourceRoot,
): ResourceLoading {
  return resourceLoading({
    ...FULL_RESOURCE_CONFIGS,
    resourceRoot,
    preLoadImages: PreLoadPathConfigs,
  });
}

/**
 * 開発中素材も含めたフルリソースを読み込む
 * @param resourceRoot リソースルート
 * @returns リソース読み込みオブジェクト
 */
export function developingFullResourceLoading(
  resourceRoot: ResourceRoot,
): ResourceLoading {
  return resourceLoading({
    ...DEVELOPING_FULL_RESOURCE_CONFIGS,
    resourceRoot,
    preLoadImages: PreLoadPathConfigs,
  });
}
