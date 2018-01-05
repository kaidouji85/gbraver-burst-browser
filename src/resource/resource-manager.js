// @flow
import * as R from 'ramda';
import type {CanvasPicture} from "./loader/canvas-image-loader";
import {CANVAS_PICTURE_PATH, loadAllCanvasImage, loadCanvasImage} from './loader/canvas-image-loader';
import type {Model} from "./loader/json-model-loader";
import {loadAllJsonModel} from "./loader/json-model-loader";
import type {Texture} from "./loader/texture-loader";
import {loadAllTexture} from "./loader/texture-loader";

/**
 * リソース管理オブジェクト
 */
export type Resources = {
  /** モデル */
  models: Model[];

  /** テクスチャ */
  textures: Texture[];

  /** キャンパス用画像 */
  canvasImages: CanvasPicture[];
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
      canvasImages: []
    };
    this.basePath = basePath;
  }

  /**
   * 本ゲームで使用するモデルをすべて読み込む
   *
   * @param basePath ベースとなるパス
   * @return 結果を返すPromise
   */
  async loadModels(): ResourceManager {
    this.resources.models = await loadAllJsonModel(this.basePath);
    return this;
  }

  /**
   * 本ゲームで使用するテクスチャをすべて読み込む
   *
   * @return 結果を返すPromise
   */
  async loadTextures(): ResourceManager {
    this.resources.textures = await loadAllTexture(this.basePath);
    return this;
  }

  /**
   * 本ゲームで使用するキャンバス用画像をすべて読み込む
   *
   * @return 結果を返すPromise
   */
  async loadCanvasImages(): ResourceManager {
    this.resources.canvasImages = await loadAllCanvasImage(this.basePath);
    return this;
  }
}