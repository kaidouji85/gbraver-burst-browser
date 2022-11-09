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
    resourceRoot,
    preFetchPaths: PRE_FETCH_PATH_IDS,
    gltfConfigs: GLTF_CONFIGS,
    textureConfigs: TEXTURE_CONFIGS,
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
    canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
    soundConfigs: SOUND_CONFIGS,
  });
}

/**
 * フルリソースとの差分を返す
 * @param resources リソース管理オブジェクト
 * @return フルリソースとの差分
 */
function differenceFromFullResource(resources: Resources) {
  const gltfIDs = resources.gltfs.map((v) => v.id);
  const gltfConfigs = GLTF_CONFIGS.filter((v) => !gltfIDs.includes(v.id));
  const textureIDs = resources.textures.map((v) => v.id);
  const textureConfigs = TEXTURE_CONFIGS.filter(
    (v) => !textureIDs.includes(v.id)
  );
  const cubeTextureIDs = resources.cubeTextures.map((v) => v.id);
  const cubeTextureConfigs = CUBE_TEXTURE_CONFIGS.filter(
    (v) => !cubeTextureIDs.includes(v.id)
  );
  const canvasImageIDs = resources.canvasImages.map((v) => v.id);
  const canvasImageConfigs = CANVAS_IMAGE_CONFIGS.filter(
    (v) => !canvasImageIDs.includes(v.id)
  );
  const soundIDs = resources.sounds.map((v) => v.id);
  const soundConfigs = SOUND_CONFIGS.filter((v) => !soundIDs.includes(v.id));
  return {
    resourceRoot: resources.rootPath,
    preFetchPaths: PRE_FETCH_PATH_IDS,
    gltfConfigs,
    textureConfigs,
    cubeTextureConfigs,
    canvasImageConfigs,
    soundConfigs,
  };
}

/**
 * 読みこんだリソースをマージする
 * @param resources マージ前のリソース
 * @param loading リソース読み込みオブジェクト
 * @return マージ結果
 */
async function mergeResources(
  resources: Resources,
  loading: ResourceLoading
): Promise<Resources> {
  const loadedResources = await loading.resources;
  const gltfs = [...resources.gltfs, ...loadedResources.gltfs];
  const textures = [...resources.textures, ...loadedResources.textures];
  const cubeTextures = [
    ...resources.cubeTextures,
    ...loadedResources.cubeTextures,
  ];
  const canvasImages = [
    ...resources.canvasImages,
    ...loadedResources.canvasImages,
  ];
  const sounds = [...resources.sounds, ...loadedResources.sounds];
  return {
    ...resources,
    gltfs,
    textures,
    cubeTextures,
    canvasImages,
    sounds,
  };
}

/**
 * 全リソースの差分読み込み
 * 引数のリソース管理オブジェクトで読み込まれたものはスキップする
 * なお、本関数ではリソースパスのプリフェッチは行わない
 *
 * @param resources リソース管理オブジェクト
 * @return リソース読み込みオブジェクト
 */
export function fullResourceLoadingFrom(resources: Resources): ResourceLoading {
  const params = differenceFromFullResource(resources);
  const loading = resourceLoading(params);
  const mergedResources = mergeResources(resources, loading);
  return { loading: loading.loading, resources: mergedResources };
}
