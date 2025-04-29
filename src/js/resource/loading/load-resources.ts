import { Observable, ReplaySubject } from "rxjs";

import { Resources } from "..";
import { loadCanvasImage } from "../canvas-image/load-canvas-image";
import {
  CanvasImageConfig,
  CanvasImageResource,
} from "../canvas-image/resource";
import { loadCubeTexture } from "../cube-texture/load-cube-texture";
import {
  CubeTextureConfig,
  CubeTextureResource,
} from "../cube-texture/resource";
import { loadGlTF } from "../gltf/load-gltf";
import { GlTFConfig, GlTFResource } from "../gltf/resource";
import { getAllPaths } from "../path/get-all-paths";
import { preLoadImage } from "../path/pre-load-image";
import { PathConfig } from "../path/resource";
import { toPath } from "../path/to-path";
import { ResourceRoot } from "../resource-root";
import { loadSound } from "../sound/load";
import { SoundResource } from "../sound/resource";
import { SoundConfig } from "../sound/resource";
import { loadTexture } from "../texture/load";
import { TextureConfig, TextureResource } from "../texture/resource";
import { LoadingActions } from "./loading-actions";

/** 読み込み対象となるリソースの設定をあつめたもの */
export type LoadingTargetConfigs = {
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

/** リソース読み込み開始パラメータ */
type LoadingStartParams = LoadingTargetConfigs & {
  /** リソースルート */
  resourceRoot: ResourceRoot;
  /**
   * プリロードする画像
   * プリロードでは読み込み開始だけを行い、読み込み完了まで待たない
   */
  preLoadImages: PathConfig[];
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
 * リソース読み込みを開始する
 * @param params パラメータ
 * @returns リソース読み込み情報
 */
function startLoading(params: LoadingStartParams): LoadingPromises {
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
 * @returns 生成結果
 */
function createLoadingActions(
  loadings: LoadingPromises,
): Observable<LoadingActions> {
  const loadingActions = new ReplaySubject<LoadingActions>(1);
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
 * @returns 生成結果
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

/** リソース読み込みパラメータ */
export type ResourceLoadingParams = LoadingStartParams;

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
 * @returns リソース読み込みオブジェクト
 */
export function loadResources(params: ResourceLoadingParams): ResourceLoading {
  const loadings = startLoading(params);
  return {
    loading: createLoadingActions(loadings),
    resources: createResources(loadings, params.resourceRoot),
  };
}
