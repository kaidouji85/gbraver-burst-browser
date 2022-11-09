// @flow

import type { Stream } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { Resources } from "..";
import type { CanvasImageConfig } from "../canvas-image";
import { loadCanvasImage } from "../canvas-image";
import type { CubeTextureConfig } from "../cube-texture";
import { loadCubeTexture } from "../cube-texture";
import type { GlTFConfig } from "../gltf";
import { loadGlTF } from "../gltf";
import type { PathId } from "../path";
import { getAllPaths, PathConfigs } from "../path";
import type { ResourceRoot } from "../resource-root";
import type { SoundConfig } from "../sound";
import { loadSound } from "../sound";
import { loadTexture } from "../texture/load";
import type { TextureConfig } from "../texture/resource";
import type { LoadingActions } from "./loading-actions";

/** リソース読み込みオブジェクト */
export type ResourceLoading = {
  /** 読み込みストリーム */
  loading: Stream<LoadingActions>,
  /** 読み込んだリソース管理オブジェクト */
  resources: Promise<Resources>,
};

/** リソース読み込みパラメータ */
type ResourceLoadingParams = {
  /** リソースルート */
  resourceRoot: ResourceRoot,
  /** プリフェッチするパス */
  preFetchPaths: PathId[],
  /** 読み込むGLTFモデル */
  gltfConfigs: GlTFConfig[],
  /** 読み込むテクスチャ */
  textureConfigs: TextureConfig[],
  /** 読み込むキューブテクスチャ */
  cubeTextureConfigs: CubeTextureConfig[],
  /** 読み込むキャンバス用画像 */
  canvasImageConfigs: CanvasImageConfig[],
  /** 読み込む音声 */
  soundConfigs: SoundConfig[],
};

/**
 * リソースを読み込む
 * @param params 読み込みパラメータ
 * @return リソース読み込みオブジェクト
 */
export function resourceLoading(
  params: ResourceLoadingParams
): ResourceLoading {
  const preFetchPaths = PathConfigs.filter((v) =>
    params.preFetchPaths.includes(v.id)
  ).map((v) => fetch(v.path(params.resourceRoot)));
  const gltfLoadings = params.gltfConfigs.map((v) =>
    loadGlTF(params.resourceRoot, v)
  );
  const textureLoadings = params.textureConfigs.map((v) =>
    loadTexture(params.resourceRoot, v)
  );
  const cubeTextureLoadings = params.cubeTextureConfigs.map((v) =>
    loadCubeTexture(params.resourceRoot, v)
  );
  const canvasImageLoadings = params.canvasImageConfigs.map((v) =>
    loadCanvasImage(params.resourceRoot, v)
  );
  const soundLoadings = params.soundConfigs.map((v) =>
    loadSound(params.resourceRoot, v)
  );

  const loadingActions = createStreamSource();
  const allLoading = [
    ...preFetchPaths,
    ...gltfLoadings,
    ...textureLoadings,
    ...cubeTextureLoadings,
    ...canvasImageLoadings,
    ...soundLoadings,
  ];
  let completedLoadingCounts = 0;
  allLoading.forEach((loading) => {
    loading.then(() => {
      completedLoadingCounts++;
      const completedRate = completedLoadingCounts / allLoading.length;
      loadingActions.next({ type: "LoadingProgress", completedRate });
    });
  });
  const resources = (async (): Promise<Resources> => {
    const [gltfs, textures, cubeTextures, canvasImages, sounds] =
      await Promise.all([
        Promise.all(gltfLoadings),
        Promise.all(textureLoadings),
        Promise.all(cubeTextureLoadings),
        Promise.all(canvasImageLoadings),
        Promise.all(soundLoadings),
      ]);
    const paths = getAllPaths(params.resourceRoot);
    return {
      rootPath: params.resourceRoot,
      gltfs,
      textures,
      cubeTextures,
      canvasImages,
      sounds,
      paths,
    };
  })();
  return { loading: loadingActions, resources };
}
