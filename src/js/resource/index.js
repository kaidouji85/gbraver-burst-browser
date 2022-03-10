// @flow
import type {TextureConfig, TextureResource} from "./texture";
import {TEXTURE_CONFIGS, loadTexture} from "./texture";
import type {CanvasImageConfig, CanvasImageResource} from "./canvas-image";
import {CANVAS_IMAGE_CONFIGS, loadCanvasImage,} from "./canvas-image";
import type {GlTFConfig, GlTFResource} from "./gltf";
import {GLTF_CONFIGS, loadGlTF} from "./gltf";
import type {CubeTextureConfig, CubeTextureResource} from "./cube-texture";
import {CUBE_TEXTURE_CONFIGS, loadCubeTexture} from "./cube-texture";
import type {SoundConfig, SoundResource} from "./sound";
import {SOUND_CONFIGS, SOUND_IDS, loadSound} from "./sound";
import type {ResourceRoot} from "./resource-root";
import type {LoadingActions} from "./loading-actions";
import type {Path} from "./path";
import {getAllPaths} from "./path";
import type {Stream} from "../stream/core";
import {RxjsStreamSource} from "../stream/rxjs";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** リソースフォルダのルート */
  rootPath: ResourceRoot,
  /** 各種リソースのパス */
  paths: Path[],
  /** GlTFモデル */
  gltfs: GlTFResource[],
  /** テクスチャ */
  textures: TextureResource[],
  /** キューブテクスチャ */
  cubeTextures: CubeTextureResource[],
  /** キャンバス用画像 */
  canvasImages: CanvasImageResource[],
  /** 音 */
  sounds: SoundResource[],
};

/**
 * 空のリソース管理オブジェクトを生成する
 *
 * @param resourceRoot リソースルート
 * @return リソース管理オブジェクト
 */
export function emptyResources(resourceRoot: ResourceRoot): Resources {
  return {rootPath: resourceRoot, paths: [], gltfs: [], textures: [], 
    cubeTextures: [], canvasImages: [], sounds: []};
}

/** リソース読み込みオブジェクト */
export type ResourceLoading = {
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
 * リソースを読み込む
 * なお、本関数ではリソースパスのプリフェッチは行わない
 *
 * @param params 読み込みパラメータ
 * @return リソース読み込みオブジェクト
 */
function resourceLoading(params: ResourceLoadingParams): ResourceLoading {
  const gltfLoadings = params.gltfConfigs.map(v => loadGlTF(params.resourceRoot, v));
  const textureLoadings = params.textureConfigs.map(v => loadTexture(params.resourceRoot, v));
  const cubeTextureLoadings = params.cubeTextureConfigs.map(v => loadCubeTexture(params.resourceRoot, v));
  const canvasImageLoadings = params.canvasImageConfigs.map(v => loadCanvasImage(params.resourceRoot, v));
  const soundLoadings = params.soundConfigs.map(v => loadSound(params.resourceRoot, v));
  
  const loadingActtions = new RxjsStreamSource();
  const allLoading = [...gltfLoadings, ...textureLoadings, ...cubeTextureLoadings, ...canvasImageLoadings, ...soundLoadings];
  let completedLoadingCounts = 0;
  allLoading.forEach(loading => {
    loading.then(() => {
      completedLoadingCounts ++;
      const completedRate = completedLoadingCounts / allLoading.length;
      loadingActtions.next({type: 'LoadingProgress', completedRate});
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
  return {loading: loadingActtions, resources};
}

/**
 * 全リソースを読み込む
 * なお、本関数ではリソースパスのプリフェッチは行わない
 *
 * @param resourceRoot リソースルート
 * @return リソース読み込みオブジェクト
 */
export function fullResourceLoading(resourceRoot: ResourceRoot): ResourceLoading {
  return resourceLoading({resourceRoot, gltfConfigs: GLTF_CONFIGS, textureConfigs: TEXTURE_CONFIGS,
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS, canvasImageConfigs: CANVAS_IMAGE_CONFIGS,soundConfigs: SOUND_CONFIGS});
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
  const gltfIDs = resources.gltfs.map(v => v.id);
  const gltfConfigs = GLTF_CONFIGS.filter(v => !gltfIDs.includes(v.id));
  const textureIDs = resources.textures.map(v => v.id);
  const textureConfigs = TEXTURE_CONFIGS.filter(v => !textureIDs.includes(v.id));
  const cubeTextureIDs = resources.cubeTextures.map(v => v.id);
  const cubeTextureConfigs = CUBE_TEXTURE_CONFIGS.filter(v => !cubeTextureIDs.includes(v.id));
  const canvasImageIDs = resources.canvasImages.map(v => v.id);
  const canvasImageConfigs = CANVAS_IMAGE_CONFIGS.filter(v => !canvasImageIDs.includes(v.id));
  const soundIDs = resources.sounds.map(v => v.id);
  const soundConfigs = SOUND_CONFIGS.filter(v => !soundIDs.includes(v.id));
  const loading = resourceLoading({resourceRoot: resources.rootPath, gltfConfigs, textureConfigs, cubeTextureConfigs, canvasImageConfigs, soundConfigs});
  const mergedReosurces = (async () => {
    const loadedReosurces = await loading.resources;
    const gltfs = [...resources.gltfs, ...loadedReosurces.gltfs];
    const textures = [...resources.textures, ...loadedReosurces.textures];
    const cubeTextures = [...resources.cubeTextures, ...loadedReosurces.cubeTextures];
    const canvasImages = [...resources.canvasImages, ...loadedReosurces.canvasImages];
    const sounds = [...resources.sounds, ...loadedReosurces.sounds];
    return {...resources, gltfs, textures, cubeTextures, canvasImages, sounds};
  })();
  return {loading: loading.loading, resources: mergedReosurces};
}

/** タイトルで利用する音声 */
const TITLE_SOUND_IDS = [
  SOUND_IDS.PUSH_BUTTON,
  SOUND_IDS.CHANGE_VALUE,
  SOUND_IDS.TITLE_BGM,
];

/**
 * タイトルで利用するリソースを読み込む
 *
 * @param resourceRoot リソースルート
 * @return リソース読み込みオブジェクト
 */
export function titleResourceLoading(resourceRoot: ResourceRoot): ResourceLoading {
  const soundConfigs = SOUND_CONFIGS.filter(v => TITLE_SOUND_IDS.includes(v.id)); 
  return resourceLoading({resourceRoot, gltfConfigs: [], textureConfigs: [], cubeTextureConfigs: [], canvasImageConfigs: [], soundConfigs});
}
