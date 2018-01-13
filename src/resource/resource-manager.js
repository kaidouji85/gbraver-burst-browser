// @flow
import type {CanvasPicture} from "./loader/canvas-image-loader";
import {loadAllCanvasImage} from './loader/canvas-image-loader';
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
    };
    this.basePath = basePath;
  }

  /** ゲームのリソースを全て読み込む */
  async load() {
    const tileMap = loadAllTileMap();
    const [models, textures, canvasImages] = await Promise.all([
      loadAllJsonModel(this.basePath),
      loadAllTexture(this.basePath),
      loadAllCanvasImage(this.basePath),
    ]);
    this.resources = {models, textures, canvasImages, tileMap};
  }
}