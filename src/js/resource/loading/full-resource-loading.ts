import type { Resources } from "..";
import { CANVAS_IMAGE_CONFIGS } from "../canvas-image";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture";
import { GLTF_CONFIGS } from "../gltf";
import { PreLoadPathConfigs } from "../path/configs";
import type { ResourceRoot } from "../resource-root";
import { SOUND_CONFIGS } from "../sound";
import {
  DEVELOPING_TEXTURE_CONFIGS,
  TEXTURE_CONFIGS,
} from "../texture/configs";
import { extractUnloadedResourceConfigs } from "./extract-unloaded-resource-configs";
import { mergeResources } from "./merge-resources";
import type { LoadingTargetConfigs, ResourceLoading } from "./resource-loading";
import { resourceLoading } from "./resource-loading";

/** フルリソースの設定 */
const FULL_RESOURCE_CONFIGS: LoadingTargetConfigs = {
  gltfConfigs: GLTF_CONFIGS,
  textureConfigs: TEXTURE_CONFIGS,
  cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
  canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
  soundConfigs: SOUND_CONFIGS,
};

/** 開発中素材も含めたフルリソース設定 */
const DEVELOPING_FULL_RESOURCE_CONFIGS: LoadingTargetConfigs = {
  gltfConfigs: GLTF_CONFIGS,
  textureConfigs: [...TEXTURE_CONFIGS, ...DEVELOPING_TEXTURE_CONFIGS],
  cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
  canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
  soundConfigs: SOUND_CONFIGS,
};

/**
 * フルリソースを読み込む
 * @param resourceRoot リソースルート
 * @return リソース読み込みオブジェクト
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
 * @return リソース読み込みオブジェクト
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

/**
 * リソース差分読み込み
 * 引数のリソース管理オブジェクトで読み込まれたものはスキップする
 * @param resources 読み込んだリソース
 * @param configs フルフリース設定
 * @return リソース読み込みオブジェクト
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
 * @return リソース読み込みオブジェクト
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
 * @return リソース読み込みオブジェクト
 */
export function developingFullResourceDifferentialLoad(
  resources: Resources,
): ResourceLoading {
  return resourceDifferentialLoad(resources, DEVELOPING_FULL_RESOURCE_CONFIGS);
}
