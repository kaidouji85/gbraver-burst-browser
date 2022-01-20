// @flow
import type {TextureConfig} from './texture';
import {TEXTURE_CONFIGS, loadTexture} from "./texture";
import type {CanvasImageConfig} from "./canvas-image";
import {CANVAS_IMAGE_CONFIGS, loadCanvasImage} from "./canvas-image";
import type {GlTFConfig} from "./gltf";
import {GLTF_CONFIGS, loadGlTF} from "./gltf";
import type {CubeTextureConfig} from "./cube-texture";
import {CUBE_TEXTURE_CONFIGS, loadCubeTexture} from "./cube-texture";
import type {SoundConfig} from "./sound";
import {SOUND_CONFIGS, loadSound} from "./sound";
import type {ResourceRoot} from "./resource-root";
import {getAllPaths} from "./path";
import type {Stream} from "../stream/core";
import {RxjsStreamSource} from "../stream/rxjs";
import type {Resources} from './index';

/** リソース読み込みアクション */
export type LoadingActions = LoadingProgress;

/** リソース読み込み中 */
export type LoadingProgress = {
  type: 'LoadingProgress',
  /** 0 - 1で表現する進捗率 */
  completedRate: number
};

/** リソース読み込みオブジェクト */
type ResourceLoading = {
  /** 読み込みストリーム */
  loading: Stream<LoadingActions>,
  /** 読み込んだリソース管理オブジェクト */
  resources: Promise<Resources>
}

/** リソース読み込みパラメータ */
type ResourceLoadingParams = {
  /** リソースルート */
  resourceRoot: ResourceRoot,
  /** 読み込むGLTFモデル */
  gltfConfigs: GlTFConfig[],
  /** 読み込むテクスチャ */
  textureConfigs: TextureConfig[],
  /** 読み込むキューブテクスチャ */
  cubeTextureConfigs: CubeTextureConfig[],
  /** 読み込むキャンバス用画像 */
  canvasImageConfigs: CanvasImageConfig[],
  /** 読み込む音声 */
  soundConfigs: SoundConfig[]
};

/**
 * リソース読み込み
 *
 * @param params 読み込みパラメータ
 * @return リソース読み込みオブジェクト
 */
export function resourceLoading(params: ResourceLoadingParams): ResourceLoading {
  const gltfLoadings = params.gltfConfigs.map(v => loadGlTF(params.resourceRoot, v));
  const textureLoadings = params.gltfConfigs.map(v => loadTexture(params.resourceRoot, v));
  const cubeTextureLoadings = params.cubeTextureConfigs.map(v => loadCubeTexture(params.resourceRoot, v));
  const canvasImageLoadings = params.canvasImageConfigs.map(v => loadCanvasImage(params.resourceRoot, v));
  const soundLoadings = params.soundConfigs.map(v => loadSound(params.resourceRoot, v));
  
  const loading = new RxjsStreamSource();
  const allLoading = [...gltfLoadings, ...textureLoadings, ...cubeTextureLoadings, ...canvasImageLoadings, ...soundLoadings];
  let completedLoadingCounts = 0;
  allLoading.flat().forEach(v => {
    v.then(() => {
      completedLoadingCounts ++;
      const completedRate = completedLoadingCounts / allLoading.length;
      loading.next({type: 'LoadingProgress', completedRate});
    });
  });
  
  const resources = (async (): Promise<Resources> => {
    const [gltfs, textures, cubeTextures, canvasImages, sounds] = await Promise.all([
      Promise.all(gltfLoadings), Promise.all(textureLoadings), Promise.all(cubeTextureLoadings),
      Promise.all(canvasImageLoadings), Promise.all(soundLoadings)
    ]);
    const paths = getAllPaths(params.resourceRoot);
    return {rootPath: params.resourceRoot, gltfs, textures, cubeTextures, canvasImages, sounds, paths};
  })();
  return {loading, resources};
}

export function fullResourceLoading(resourceRoot: ResourceRoot): ResourceLoading {
  return resourceLoading({resourceRoot, gltfConfigs: GLTF_CONFIGS, textureConfigs: TEXTURE_CONFIGS, 
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS, canvasImageConfigs: CANVAS_IMAGE_CONFIGS, soundConfigs: SOUND_CONFIGS
  });
}