// @flow
import type {TextureConfig, TextureResource} from "./texture";
import {TEXTURE_CONFIGS, loadTexture, loadingAllTextures} from "./texture";
import type {CanvasImageConfig, CanvasImageResource} from "./canvas-image";
import {
  CANVAS_IMAGE_CONFIGS,
  loadCanvasImage,
  loadingAllCanvasImages,
} from "./canvas-image";
import type {GlTFConfig, GlTFResource} from "./gltf";
import {GLTF_CONFIGS, loadGlTF, loadingAllGTLFModels} from "./gltf";
import type {CubeTextureConfig, CubeTextureResource} from "./cube-texture";
import {
  CUBE_TEXTURE_CONFIGS,
  loadCubeTexture,
  loadingAllCubeTextures,
} from "./cube-texture";
import type {SoundConfig, SoundResource} from "./sound";
import { SOUND_CONFIGS, loadSound, loadingAllSounds } from "./sound";
import type {ResourceRoot} from "./resource-root";
import type {LoadingActions} from "./loading-actions";
import type {Path} from "./path";
import {getAllPaths} from "./path";
import type {Stream, StreamSource} from "../stream/core";
import {RxjsStreamSource} from "../stream/rxjs";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** リソースフォルダのルート */
  rootPath: ResourceRoot,
  /** パス */
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
 * リソース読み込み
 *
 * @param params 読み込みパラメータ
 * @return リソース読み込みオブジェクト
 */
function resourceLoading(params: ResourceLoadingParams): ResourceLoading {
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

/**
 * 全リソースを読み込む
 *
 * @param resourceRoot リソースルート
 * @return リソース読み込みオブジェクト
 */
export function fullResourceLoading(resourceRoot: ResourceRoot): ResourceLoading {
  return resourceLoading({resourceRoot, gltfConfigs: GLTF_CONFIGS, textureConfigs: TEXTURE_CONFIGS,
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS, canvasImageConfigs: CANVAS_IMAGE_CONFIGS,soundConfigs: SOUND_CONFIGS});
}

/**
 * @deprecated
 * リソース読み込み
 */
export class ResourceLoader {
  _resourceROot: ResourceRoot;
  _gltfLoading: Array<Promise<GlTFResource>>;
  _textureLoading: Array<Promise<TextureResource>>;
  _cubeTextureLoading: Array<Promise<CubeTextureResource>>;
  _canvasImageLoading: Array<Promise<CanvasImageResource>>;
  _soundLoading: Array<Promise<SoundResource>>;
  _paths: Path[];
  _allLoadingCounts: number;
  _completedLoadingCounts: number;
  _loading: StreamSource<LoadingActions>;

  /**
   * コンストラクタ
   *
   * @param resourceRoot リソースルート
   */
  constructor(resourceRoot: ResourceRoot) {
    this._resourceROot = resourceRoot;
    this._gltfLoading = loadingAllGTLFModels(resourceRoot);
    this._textureLoading = loadingAllTextures(resourceRoot);
    this._cubeTextureLoading = loadingAllCubeTextures(resourceRoot);
    this._canvasImageLoading = loadingAllCanvasImages(resourceRoot);
    this._soundLoading = loadingAllSounds(resourceRoot);
    this._paths = getAllPaths(resourceRoot)
    
    const allLoading = [].concat(
      this._gltfLoading,
      this._textureLoading,
      this._cubeTextureLoading,
      this._canvasImageLoading,
      this._soundLoading,
    );
    this._allLoadingCounts = allLoading.length;
    this._completedLoadingCounts = 0;
    this._loading = new RxjsStreamSource();
    allLoading.forEach(loading => {
      loading.then(() => {
        this._completedLoadingCounts ++;
        this._loading.next({
          type: 'LoadingProgress',
          completedRate: this._completedLoadingCounts / this._allLoadingCounts
        });
      });
    });
  }

  /**
   * リソースを読み込む
   *
   * @return リソース管理オブジェクト
   */
  async load(): Promise<Resources> {
    const [gltfs, textures, cubeTextures, canvasImages, sounds] = await Promise.all([
      Promise.all(this._gltfLoading),
      Promise.all(this._textureLoading),
      Promise.all(this._cubeTextureLoading),
      Promise.all(this._canvasImageLoading),
      Promise.all(this._soundLoading),
    ]);

    return {
      rootPath: this._resourceROot,
      gltfs: gltfs,
      textures: textures,
      cubeTextures: cubeTextures,
      canvasImages: canvasImages,
      sounds: sounds,
      paths: this._paths
    };
  }

  /**
   * 読み込み進捗率ストリームを取得する
   *
   * @return 読み込み進捗率ストリーム
   */
  progress(): Stream<LoadingActions> {
    return this._loading;
  }
}
