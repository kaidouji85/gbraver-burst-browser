// @flow

import type { Resources } from "..";
import type { CanvasImageConfig } from "../canvas-image";
import { CANVAS_IMAGE_CONFIGS } from "../canvas-image";
import type { CubeTextureConfig } from "../cube-texture";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture";
import type { GlTFConfig } from "../gltf";
import { GLTF_CONFIGS } from "../gltf";
import type { PathId } from "../path";
import { PathIds } from "../path";
import type { ResourceRoot } from "../resource-root";
import type { SoundConfig } from "../sound";
import { SOUND_CONFIGS } from "../sound";
import {
  DEVELOPING_TEXTURE_CONFIGS,
  TEXTURE_CONFIGS,
} from "../texture/configs";
import type { TextureConfig } from "../texture/resource";
import { extractUnloadedResorceConfigs } from "./extract-unloaded-resorce-configs";
import { mergeResources } from "./merge-resources";
import type { ResourceLoading } from "./resource-loading";
import { resourceLoading } from "./resource-loading";

/** フルリソース読み込みでのプリフェッチ対象パス */
const PRE_FETCH_PATH_IDS: PathId[] = [
  PathIds.NPC_COURSE_EASY_ICON,
  PathIds.NPC_COURSE_NORMAL_ICON,
  PathIds.NPC_COURSE_HARD_ICON,
  PathIds.NPC_COURSE_VERY_HARD_ICON,
  PathIds.CLOSER,
];

/** リソース設定をあつめたもの */
type Configs = {
  gltfConfigs: GlTFConfig[],
  textureConfigs: TextureConfig[],
  cubeTextureConfigs: CubeTextureConfig[],
  canvasImageConfigs: CanvasImageConfig[],
  soundConfigs: SoundConfig[],
};

/** フルリソースの設定 */
const FULL_RESOURCE_CONFIGS: Configs = {
  gltfConfigs: GLTF_CONFIGS,
  textureConfigs: TEXTURE_CONFIGS,
  cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
  canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
  soundConfigs: SOUND_CONFIGS,
};

/** 開発中素材も含めたフルリソース設定 */
const DEVELOPING_FULL_RESOURCE_CONFIGS: Configs = {
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
  resourceRoot: ResourceRoot
): ResourceLoading {
  return resourceLoading({
    ...FULL_RESOURCE_CONFIGS,
    resourceRoot,
    preFetchPaths: PRE_FETCH_PATH_IDS,
  });
}

/**
 * 開発中素材も含めたフルリソースを読み込む
 * @param resourceRoot リソースルート
 * @return リソース読み込みオブジェクト
 */
export function developingFullResourceLoading(
  resourceRoot: ResourceRoot
): ResourceLoading {
  return resourceLoading({
    ...DEVELOPING_FULL_RESOURCE_CONFIGS,
    resourceRoot,
    preFetchPaths: PRE_FETCH_PATH_IDS,
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
  configs: Configs
): ResourceLoading {
  const differentialConfigs = extractUnloadedResorceConfigs(configs, resources);
  const loading = resourceLoading({
    ...differentialConfigs,
    resourceRoot: resources.rootPath,
    preFetchPaths: PRE_FETCH_PATH_IDS,
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
  resources: Resources
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
  resources: Resources
): ResourceLoading {
  return resourceDifferentialLoad(resources, DEVELOPING_FULL_RESOURCE_CONFIGS);
}
