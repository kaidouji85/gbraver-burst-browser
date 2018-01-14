// @flow
import type {CanvasPicture} from "./loader/depricated-canvas-image-loader";
import {loadAllCanvasImage as depricated_loadAllCanvasImage} from './loader/depricated-canvas-image-loader';
import type {TileMapManager} from "./tile-map";
import {loadAllTileMap} from "./tile-map";
import type {TextureManager} from "./texture";
import {loadAllTexture} from "./texture";
import type {JsonModelManager} from "./json-model";
import {loadAllJsonModel} from "./json-model";
import type {CanvasImageManager} from "./canvas-image";
import {loadAllCanvasImage} from "./canvas-image";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** モデル */
  models: JsonModelManager[],
  /** テクスチャ */
  textures: TextureManager[],
  /** キャンバス用画像 */
  canvasImages: CanvasImageManager[],
  /** タイルマップ */
  tileMap: TileMapManager[],

  // TODO 削除する
  /** キャンパス用画像 */
  depuricated_canvasImages: CanvasPicture[],
};

/**
 * リソース管理クラス
 */
export class ResourceManager {
  /** リソース管理オブジェクト */
  resources: Resources;
  /**
   * リソースのベースとなるパス
   * 本クラスを呼び出したファイルからresourcesフォルダの相対パスを指定する
   */
  basePath: string;

  constructor(basePath: string = '') {
    this.resources = {
      models: [],
      textures: [],
      canvasImages: [],
      tileMap: [],

      // TODO 削除する
      depuricated_canvasImages: [],
    };
    this.basePath = basePath;
  }

  /** ゲームのリソースを全て読み込む */
  async load() {
    const tileMap = loadAllTileMap();
    const [models, textures, canvasImages, depuricated_canvasImages] = await Promise.all([
      loadAllJsonModel(this.basePath),
      loadAllTexture(this.basePath),
      loadAllCanvasImage(this.basePath),

      // TODO 削除する
      depricated_loadAllCanvasImage(this.basePath),
    ]);
    this.resources = {models, textures, tileMap, canvasImages, depuricated_canvasImages};
  }
}