import { PreLoadPathConfigs } from "../path/configs";
import type { ResourceRoot } from "../resource-root";
import {
  DEVELOPING_FULL_RESOURCE_CONFIGS,
  FULL_RESOURCE_CONFIGS,
} from "./full-resource-configs";
import { ResourceLoading, loadResources } from "./load-resources";

/**
 * @deprecated
 * フルリソースを読み込む
 * @param resourceRoot リソースルート
 * @returns リソース読み込みオブジェクト
 */
export function fullResourceLoading(
  resourceRoot: ResourceRoot,
): ResourceLoading {
  return loadResources({
    ...FULL_RESOURCE_CONFIGS,
    resourceRoot,
    preLoadImages: PreLoadPathConfigs,
  });
}

/**
 * @deprecated
 * 開発中素材も含めたフルリソースを読み込む
 * @param resourceRoot リソースルート
 * @returns リソース読み込みオブジェクト
 */
export function developingFullResourceLoading(
  resourceRoot: ResourceRoot,
): ResourceLoading {
  return loadResources({
    ...DEVELOPING_FULL_RESOURCE_CONFIGS,
    resourceRoot,
    preLoadImages: PreLoadPathConfigs,
  });
}
