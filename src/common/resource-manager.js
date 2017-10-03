// @flow
import * as THREE from 'three';
import R from 'ramda';
import {loadModel, loadTexture, loadCanvasImage} from './resource-loader';

/**
 * モデルのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const MODEL_PATHS = {
  SCHOOL: 'stage/kamata/school.js',
  MANSION01: 'stage/kamata/mansion01.js',
};

/**
 * テクスチャのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const TEXTURE_PATHS = {
  // シンブレイバー関連
  SHIN_BRAVER_STAND: 'armdozer/shin-braver/stand.png',
  SHIN_BRAVER_PUNCH: 'armdozer/shin-braver/punch.png',

  // ネオランドーザ関連
  NEO_RANDOZER_STAND: 'armdozer/neo-landozer/stand.png',


  ANIME_TEST: 'armdozer/anime-test.png',

  // 蒲田ステージ関連
  TREE: 'stage/kamata/wood2.png',
  FENCE: 'stage/kamata/fence.png',
  GROUND_SAND: 'stage/kamata/ground-sand.png',
  CITY_LOAD: 'stage/kamata/city-road.png',
  BUILD_BASIC: 'stage/kamata/build-basic.png',

  // 青空スカイボックス関連
  BLUE_SKY_FRONT: 'sky-box/blue-sky/front.png',
  BLUE_SKY_RIGHT: 'sky-box/blue-sky/right.png',
  BLUE_SKY_BACK: 'sky-box/blue-sky/back.png',
  BLUE_SKY_LEFT: 'sky-box/blue-sky/left.png',
  BLUE_SKY_UP: 'sky-box/blue-sky/up.png',
  BLUE_SKY_DOWN: 'sky-box/blue-sky/down.png',
};


/**
 * キャンバス用画像ファイルのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const CANVAS_PICTURE_PATH = {
  PLAYER_GAUGE: 'gauge/player-gauge.png',
  ENEMY_GAUGE: 'gauge/enemy-gauge.png',

  // 数字系画像
  HP_NUMBER: 'gauge/number/hp-number.png',

  // HPゲージ系
  HP_GAUGE_BASE: 'gauge/hp-gauge/hp-gauge-base.png',
  HP_BAR_DOWN: 'gauge/hp-gauge/hp-bar-down.png',
  HP_BAR_UP: 'gauge/hp-gauge/hp-bar-up.png',
  HP_GAUGE_LABEL: 'gauge/hp-gauge/hp-gauge-label.png',
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
 * モデル管理オブジェクト
 */
export type Model = {
  /** モデルのパス */
  path: string;

  /** 形状 */
  geometry: THREE.Geometry;

  /** 材質 */
  material: THREE.Material;
};

/**
 * テクスチャ管理オブジェクト
 */
export type Texture = {
  /** テクスチャのパス */
  path: string;

  /** テクスチャ */
  texture: THREE.Texture;
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

  constructor(basePath: string) {
    this.resources = {
      models: [],
      textures: [],
    };
    this.basePath = basePath || '';
  }

  /**
   * 本ゲームで使用するモデルをすべて読み込む
   *
   * @param basePath ベースとなるパス
   * @return 結果を返すPromise
   */
  loadModels(): Promise<ResourceManager> {
    const func = R.pipe(
      R.values,
      R.map(path => loadModel(`${this.basePath}${path}`)
          .then(result => ({path, geometry: result.geometry, material: result.material}))
      ));
    return Promise.all(func(MODEL_PATHS))
      .then(models => {
        this.resources.models = models;
        return this;
      });
  }

  /**
   * 本ゲームで使用するテクスチャをすべて読み込む
   *
   * @return 結果を返すPromise
   */
  loadTextures(): Promise<ResourceManager> {
    const func = R.pipe(
      R.values,
      R.map(path => loadTexture(`${this.basePath}${path}`)
        .then(texture => ({path, texture}))
      ));
    return Promise.all(func(TEXTURE_PATHS))
      .then(textures => {
        this.resources.textures = textures;
        return this;
      });
  }

  /**
   * 本ゲームで使用するキャンバス用画像をすべて読み込む
   *
   * @return 結果を返すPromise
   */
  async loadCanvasImages(): Promise<ResourceManager> {
    const load: Promise<CanvasPicture> = async (path) => {
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