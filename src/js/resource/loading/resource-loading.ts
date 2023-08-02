import { Observable, Subject } from "rxjs";

import type { Resources } from "..";
import type { CanvasImageConfig, CanvasImageResource } from "../canvas-image";
import { loadCanvasImage } from "../canvas-image";
import type { CubeTextureConfig, CubeTextureResource } from "../cube-texture";
import { loadCubeTexture } from "../cube-texture";
import type { GlTFConfig, GlTFResource } from "../gltf";
import { loadGlTF } from "../gltf";
import { getAllPaths } from "../path/get-all-paths";
import { preLoadImage } from "../path/pre-load-image";
import { PathConfig } from "../path/resource";
import { toPath } from "../path/to-path";
import type { ResourceRoot } from "../resource-root";
import type { SoundConfig, SoundResource } from "../sound";
import { loadSound } from "../sound";
import { loadTexture } from "../texture/load";
import type { TextureConfig, TextureResource } from "../texture/resource";
import type { LoadingActions } from "./loading-actions";

/** リソース読み込みパラメータ */
type ResourceLoadingParams = {
  /** リソースルート */
  resourceRoot: ResourceRoot;
  /** プリロードする画像 */
  preLoadImages: PathConfig[];
  /** 読み込むGLTFモデル */
  gltfConfigs: GlTFConfig[];
  /** 読み込むテクスチャ */
  textureConfigs: TextureConfig[];
  /** 読み込むキューブテクスチャ */
  cubeTextureConfigs: CubeTextureConfig[];
  /** 読み込むキャンバス用画像 */
  canvasImageConfigs: CanvasImageConfig[];
  /** 読み込む音声 */
  soundConfigs: SoundConfig[];
};

/** リソース読み込みPromise */
type LoadingPromises = {
  /** GLTFモデル読み込みPromise */
  gltfLoadings: Promise<GlTFResource>[];
  /** テクスチャ読み込みPromise */
  textureLoadings: Promise<TextureResource>[];
  /** キューブテクスチャ読み込みPromise */
  cubeTextureLoadings: Promise<CubeTextureResource>[];
  /** キャンバス用画像読み込みPromise */
  canvasImageLoadings: Promise<CanvasImageResource>[];
  /** 音声読み込みPromise */
  soundLoadings: Promise<SoundResource>[];
};

/**
 * 読み込みを開始する
 * @param params パラメータ
 * @return リソース読み込み情報
 */
function startLoading(params: ResourceLoadingParams): LoadingPromises {
  params.preLoadImages
    .map((v) => toPath(v, params.resourceRoot))
    .forEach((v) => preLoadImage(v));
  return {
    gltfLoadings: params.gltfConfigs.map((v) =>
      loadGlTF(params.resourceRoot, v),
    ),
    textureLoadings: params.textureConfigs.map((v) =>
      loadTexture(params.resourceRoot, v),
    ),
    cubeTextureLoadings: params.cubeTextureConfigs.map((v) =>
      loadCubeTexture(params.resourceRoot, v),
    ),
    canvasImageLoadings: params.canvasImageConfigs.map((v) =>
      loadCanvasImage(params.resourceRoot, v),
    ),
    soundLoadings: params.soundConfigs.map((v) =>
      loadSound(params.resourceRoot, v),
    ),
  };
}

/**
 * 読み込みアクションストリームを生成する
 * @param loadings 読み込みPromise
 * @return 生成結果
 */
function createLoadingActions(loadings: LoadingPromises): Observable<LoadingActions> {
  const loadingActions = new Subject<LoadingActions>();
  const allLoadings = [
    ...loadings.gltfLoadings,
    ...loadings.textureLoadings,
    ...loadings.cubeTextureLoadings,
    ...loadings.canvasImageLoadings,
    ...loadings.soundLoadings,
  ];
  let completedLoadingCounts = 0;
  allLoadings.forEach((loading) => {
    loading.then(() => {
      completedLoadingCounts++;
      const completedRate = completedLoadingCounts / allLoadings.length;
      loadingActions.next({
        type: "LoadingProgress",
        completedRate,
      });
    });
  });
  return loadingActions;
}

/**
 * リソース管理オブジェクトを生成するヘルパー関数
 * @param loading 読み込みPromise
 * @param resourceRoot リソースルート
 * @return 生成結果
 */
async function createResources(
  loading: LoadingPromises,
  resourceRoot: ResourceRoot,
): Promise<Resources> {
  const [gltfs, textures, cubeTextures, canvasImages, sounds] =
    await Promise.all([
      Promise.all(loading.gltfLoadings),
      Promise.all(loading.textureLoadings),
      Promise.all(loading.cubeTextureLoadings),
      Promise.all(loading.canvasImageLoadings),
      Promise.all(loading.soundLoadings),
    ]);
  const paths = getAllPaths(resourceRoot);
  return {
    rootPath: resourceRoot,
    gltfs,
    textures,
    cubeTextures,
    canvasImages,
    sounds,
    paths,
  };
}

/** リソース読み込みオブジェクト */
export type ResourceLoading = {
  /** 読み込みストリーム */
  loading: Observable<LoadingActions>;
  /** 読み込んだリソース管理オブジェクト */
  resources: Promise<Resources>;
};

/**
 * リソースを読み込む
 * @param params 読み込みパラメータ
 * @return リソース読み込みオブジェクト
 */
export function resourceLoading(
  params: ResourceLoadingParams,
): ResourceLoading {
  const loadings = startLoading(params);
  return {
    loading: createLoadingActions(loadings),
    resources: createResources(loadings, params.resourceRoot),
  };
}
