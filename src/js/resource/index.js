// @flow
import type {TextureResource} from "./texture";
import {loadingAllTextures} from "./texture";
import type {CanvasImageResource} from "./canvas-image";
import {loadingAllCanvasImages} from "./canvas-image";
import type {GlTFResource} from "./gltf";
import {loadingAllGTLFModels} from "./gltf";
import type {CubeTextureResource} from "./cube-texture";
import {loadingAllCubeTextures} from "./cube-texture";
import type {SoundResource} from "./sound";
import {loadingAllSounds} from "./sound";
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

/**
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
  _pathLoading: Array<Promise<Response>>;
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
    this._pathLoading = this._paths.map(path => fetch(path.path))

    const allLoading = [].concat(
      this._gltfLoading,
      this._textureLoading,
      this._cubeTextureLoading,
      this._canvasImageLoading,
      this._soundLoading,
      this._pathLoading,
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
      Promise.all(this._pathLoading),
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
