// @flow
import type {TextureResource} from "./texture";
import {loadAllTexture, loadingAllTextures} from "./texture";
import type {CanvasImageResource} from "./canvas-image";
import {loadAllCanvasImage, loadingAllCanvasImages} from "./canvas-image";
import type {GlTFResource} from "./gltf";
import {loadAllGlTFModel, loadingAllGTLFModels} from "./gltf";
import type {CubeTextureResource} from "./cube-texture";
import {loadAllCubeTexture, loadingAllCubeTextures} from "./cube-texture";
import type {SoundResource} from "./sound";
import {loadAllSounds, loadingAllSounds} from "./sound";
import type {ResourcePath} from "./path/resource-path";
import {Observable, Subject} from "rxjs";
import type {LoadingAction} from "../action/loading/loading";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** リソースパス */
  path: ResourcePath,
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

// TODO 削除する
/**
 * ゲームで使う全てのリソースを読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllResource(resourcePath: ResourcePath): Promise<Resources> {
  const basePath = `${resourcePath.get()}/`;
  const [gltfs, textures, cubeTextures, canvasImages, sounds] = await Promise.all([
    loadAllGlTFModel(basePath),
    loadAllTexture(basePath),
    loadAllCubeTexture(basePath),
    loadAllCanvasImage(basePath),
    loadAllSounds(resourcePath),
  ]);

  return {
    path: resourcePath,
    gltfs: gltfs,
    textures: textures,
    cubeTextures: cubeTextures,
    canvasImages: canvasImages,
    sounds: sounds,
  };
}

/**
 * リソース読み込み
 */
export class ResourceLoader {
  _resourcePath: ResourcePath;
  _gltfLoading: Array<Promise<GlTFResource>>;
  _textureLoading: Array<Promise<TextureResource>>;
  _cubeTextureLoading: Array<Promise<CubeTextureResource>>;
  _canvasImageLoading: Array<Promise<CanvasImageResource>>;
  _soundLoading: Array<Promise<SoundResource>>;
  _allLoadingCounts: number;
  _completedLoadingCounts: number;
  _loading: Subject<LoadingAction>;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._resourcePath = resourcePath;
    this._gltfLoading = loadingAllGTLFModels(resourcePath);
    this._textureLoading = loadingAllTextures(resourcePath);
    this._cubeTextureLoading = loadingAllCubeTextures(resourcePath);
    this._canvasImageLoading = loadingAllCanvasImages(resourcePath);
    this._soundLoading = loadingAllSounds(resourcePath);

    const allLoading = [].concat(
      this._gltfLoading,
      this._textureLoading,
      this._cubeTextureLoading,
      this._canvasImageLoading,
      this._soundLoading,
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
      const [gltfs, textures, cubeTextures, canvasImages, sounds] = await Promise.all([
        Promise.all(this._gltfLoading),
        Promise.all(this._textureLoading),
        Promise.all(this._cubeTextureLoading),
        Promise.all(this._canvasImageLoading),
        Promise.all(this._soundLoading),
      ]);

      return {
        path: this._resourcePath,
        gltfs: gltfs,
        textures: textures,
        cubeTextures: cubeTextures,
        canvasImages: canvasImages,
        sounds: sounds,
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
