// @flow

import type { Resources } from "..";
import { CANVAS_IMAGE_CONFIGS } from "../canvas-image";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture";
import { GLTF_CONFIGS } from "../gltf";
import type { PathId } from "../path";
import { PathIds } from "../path";
import type { ResourceRoot } from "../resource-root";
import { SOUND_CONFIGS } from "../sound";
import { TEXTURE_CONFIGS } from "../texture/configs";
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

/** フルリソースの設定 */
const FULL_RESOURCE_CONFIGS = {
  gltfConfigs: GLTF_CONFIGS,
  textureConfigs: TEXTURE_CONFIGS,
  cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
  canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
  soundConfigs: SOUND_CONFIGS,
};

/**
 * フルリソースを読み込む
 *
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
 * フルリソースの差分読み込み
 * 引数のリソース管理オブジェクトで読み込まれたものはスキップする
 * なお、本関数ではリソースパスのプリフェッチは行わない
 *
 * @param resources リソース管理オブジェクト
 * @return リソース読み込みオブジェクト
 */
export function fullResourceLoadingFrom(resources: Resources): ResourceLoading {
  const configs = extractUnloadedResorceConfigs(
    FULL_RESOURCE_CONFIGS,
    resources
  );
  const loading = resourceLoading({
    ...configs,
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
