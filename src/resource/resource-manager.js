// @flow
import type {CanvasPicture} from "./loader/canvas-image-loader";
import {loadAllCanvasImage} from './loader/canvas-image-loader';
import type {Model} from "./loader/depricated-json-model-loader";
import {loadAllJsonModel as depricated_loadAllJsonModel} from "./loader/depricated-json-model-loader";
import type {TileMapManager} from "./loader/tile-map-loader";
import {loadAllTileMap} from "./loader/tile-map-loader";
import type {TextureManager} from "./loader/texture-loader";
import {loadAllTexture} from "./loader/texture-loader";
import type {JsonModelManager} from "./loader/json-model-loader";
import {loadAllJsonModel} from "./loader/json-model-loader";

/**
 * リソース管理オブジェクト
 */
export type Resources = {
  /** モデル */
  models: JsonModelManager[],
  /** テクスチャ */
  textures: TextureManager[],
  /** キャンパス用画像 */
  canvasImages: CanvasPicture[],
  /** タイルマップ */
  tileMap: TileMapManager[],

  // TODO 削除する
  /** モデル */
  depricated_models: Model[],

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
      depricated_models: [],
    };
    this.basePath = basePath;
  }

  /** ゲームのリソースを全て読み込む */
  async load() {
    const tileMap = loadAllTileMap();
    const [models, textures, canvasImages, depricated_models] = await Promise.all([
      loadAllJsonModel(this.basePath),
      loadAllTexture(this.basePath),
      loadAllCanvasImage(this.basePath),

      // TODO 削除する
      depricated_loadAllJsonModel(this.basePath),
    ]);
    this.resources = {models, textures, canvasImages, tileMap, depricated_models};
  }
}