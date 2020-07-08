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
import type {ResourceRoot} from "./root/resource-root";
import {Observable, Subject} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";
import {getAllPaths} from "./path";
import type {Path} from "./path";

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
  _resourcePath: ResourceRoot;
  _gltfLoading: Array<Promise<GlTFResource>>;
  _textureLoading: Array<Promise<TextureResource>>;
  _cubeTextureLoading: Array<Promise<CubeTextureResource>>;
  _canvasImageLoading: Array<Promise<CanvasImageResource>>;
  _soundLoading: Array<Promise<SoundResource>>;
  _paths: Path[];
  _pathLoading: Array<Promise<Response>>;
  _allLoadingCounts: number;
  _completedLoadingCounts: number;
  _loading: Subject<LoadingAction>;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourceRoot) {
    this._resourcePath = resourcePath;
    this._gltfLoading = loadingAllGTLFModels(resourcePath);
    this._textureLoading = loadingAllTextures(resourcePath);
    this._cubeTextureLoading = loadingAllCubeTextures(resourcePath);
    this._canvasImageLoading = loadingAllCanvasImages(resourcePath);
    this._soundLoading = loadingAllSounds(resourcePath);

    this._paths = getAllPaths(resourcePath)
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
    this._loading = new Subject();
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
    try {
      const [gltfs, textures, cubeTextures, canvasImages, sounds, pathResponses] = await Promise.all([
        Promise.all(this._gltfLoading),
        Promise.all(this._textureLoading),
        Promise.all(this._cubeTextureLoading),
        Promise.all(this._canvasImageLoading),
        Promise.all(this._soundLoading),
        Promise.all(this._pathLoading),
      ]);

      return {
        rootPath: this._resourcePath,
        gltfs: gltfs,
        textures: textures,
        cubeTextures: cubeTextures,
        canvasImages: canvasImages,
        sounds: sounds,
        paths: this._paths
      };
    } catch(e) {
      throw e;
    }
  }

  /**
   * 読み込み進捗率ストリームを取得する
   *
   * @return 読み込み進捗率ストリーム
   */
  progress(): Observable<LoadingAction> {
    return this._loading;
  }
}
