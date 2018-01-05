// @flow
import * as R from 'ramda';
import {loadCanvasImage} from './loader/canvas-image-loader';
import type {Model} from "./loader/json-model-loader";
import {loadAllJsonModel} from "./loader/json-model-loader";
import type {Texture} from "./loader/texture-loader";
import {loadAllTexture, loadTexture, TEXTURE_PATHS} from "./loader/texture-loader";

/**
 * キャンバス用画像ファイルのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const CANVAS_PICTURE_PATH = {
  // 数字系画像
  HP_NUMBER: 'gauge/number/hp-number.png',
  BATTERY_NUMBER: 'gauge/number/battery-number.png',

  // ゲージ共通
  GAUGE_BASE: 'gauge/gauge-base.png',

  // HPゲージ系
  HP_BAR_DOWN: 'gauge/hp-gauge/hp-bar-down.png',
  HP_BAR_UP: 'gauge/hp-gauge/hp-bar-up.png',
  HP_GAUGE_LABEL: 'gauge/hp-gauge/hp-gauge-label.png',

  // バッテリーゲージ系
  BATTERY_GAUGE_LABEL: 'gauge/battery-gauge/battery-gauge-label.png',
  BATTERY_BAR_UP: 'gauge/battery-gauge/battery-bar-up.png',
  BATTERY_BAR_DOWN: 'gauge/battery-gauge/battery-bar-down.png',

};

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
 * キャンバス用画像管理オブジェクト
 */
export type CanvasPicture = {
  /** キャンバス用画像のパス */
  path: string;

  /** キャンバス用画像 */
  image: Image;
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
  async loadCanvasImages(): Promise<ResourceManager> {
    const load = async (path): Promise<CanvasPicture> => {
      const image = await loadCanvasImage(`${this.basePath}${path}`);
      return {path, image};
    }

    const canvasImages = await Promise.all(
      R.values(CANVAS_PICTURE_PATH)
        .map(load)
    );

    this.resources.canvasImages = canvasImages;
    return this;
  }
}