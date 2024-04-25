import { Resources } from "..";
import { PreLoadPathConfigs } from "../path/configs";
import { extractUnloadedResourceConfigs } from "./extract-unloaded-resource-configs";
import {
  DEVELOPING_FULL_RESOURCE_CONFIGS,
  FULL_RESOURCE_CONFIGS,
} from "./full-resource-configs";
import { mergeResources } from "./merge-resources";
import {
  LoadingTargetConfigs,
  ResourceLoading,
  resourceLoading,
} from "./resource-loading";

/**
 * リソース差分読み込み
 * 引数のリソース管理オブジェクトで読み込まれたものはスキップする
 * @param resources 読み込んだリソース
 * @param configs フルフリース設定
 * @returns リソース読み込みオブジェクト
 */
function resourceDifferentialLoad(
  resources: Resources,
  configs: LoadingTargetConfigs,
): ResourceLoading {
  const differentialConfigs = extractUnloadedResourceConfigs(
    configs,
    resources,
  );
  const loading = resourceLoading({
    ...differentialConfigs,
    resourceRoot: resources.rootPath,
    preLoadImages: PreLoadPathConfigs,
  });
  return {
    ...loading,
    resources: (async () => {
      const loaded = await loading.resources;
      return mergeResources(resources, loaded);
    })(),
  };
}

/**
 * 開発中素材も含めたフルリソースの差分読み込み
 * 引数のリソース管理オブジェクトで読み込まれたものはスキップする
 * @param resources リソース管理オブジェクト
 * @returns リソース読み込みオブジェクト
 */
export function fullResourceDifferentialLoad(
  resources: Resources,
): ResourceLoading {
  return resourceDifferentialLoad(resources, FULL_RESOURCE_CONFIGS);
}

/**
 * フルリソースの差分読み込み
 * 引数のリソース管理オブジェクトで読み込まれたものはスキップする
 * @param resources リソース管理オブジェクト
 * @returns リソース読み込みオブジェクト
 */
export function developingFullResourceDifferentialLoad(
  resources: Resources,
): ResourceLoading {
  return resourceDifferentialLoad(resources, DEVELOPING_FULL_RESOURCE_CONFIGS);
}
