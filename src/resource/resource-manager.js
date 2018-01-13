// @flow
import type {CanvasPicture} from "./loader/depricated-canvas-image-loader";
import {loadAllCanvasImage} from './loader/depricated-canvas-image-loader';
import type {TileMapManager} from "./tile-map";
import {loadAllTileMap} from "./tile-map";
import type {TextureManager} from "./texture";
import {loadAllTexture} from "./texture";
import type {JsonModelManager} from "./json-model";
import {loadAllJsonModel} from "./json-model";

/**
 * リソース管理オブジェクト
 */
export type Resources = {
  /** モデル */
  models: JsonModelManager[],
  /** テクスチャ */
  textures: TextureManager[],
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
      tileMap: [],

      // TODO 削除する
      depuricated_canvasImages: [],
    };
    this.basePath = basePath;
  }

  /** ゲームのリソースを全て読み込む */
  async load() {
    const tileMap = loadAllTileMap();
    const [models, textures, depuricated_canvasImages] = await Promise.all([
      loadAllJsonModel(this.basePath),
      loadAllTexture(this.basePath),

      // TODO 削除する
      loadAllCanvasImage(this.basePath),
    ]);
    this.resources = {models, textures, tileMap, depuricated_canvasImages};
  }
}