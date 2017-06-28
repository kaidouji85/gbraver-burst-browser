// @flow
import ThreeLib from 'three-js';
import R from 'ramda';
import {loadModel, loadTexture} from './util/resource-loader';

const THREE = ThreeLib(['JSONLoader']);

/**
 * モデルのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const MODEL_PATHS = {
  SCHOOL: 'model/school.js',
  STADIUM_LIGHT: 'model/stadium-light.js',
  MANSION01: 'model/mansion01.js',
};

/**
 * テクスチャのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const TEXTURE_PATHS = {
  // アームドーザ
  SHIN_BRAVER_STAND: 'pict/shin-braver-stand.png',
  NEO_RANDOZER_STAND: 'pict/neo-randozer-stand.png',

  // 背景関連
  TREE: 'pict/wood2.png',
  FENCE: 'pict/fence.png',
  GROUND_SAND: 'pict/ground-sand.png',
  CITY_LOAD: 'pict/city-road.png',

  // 青空スカイボックス
  BLUE_SKY_FRONT: 'pict/sky-box/blue-sky/front.png',
  BLUE_SKY_RIGHT: 'pict/sky-box/blue-sky/right.png',
  BLUE_SKY_BACK: 'pict/sky-box/blue-sky/back.png',
  BLUE_SKY_LEFT: 'pict/sky-box/blue-sky/left.png',
  BLUE_SKY_UP: 'pict/sky-box/blue-sky/up.png',
  BLUE_SKY_DOWN: 'pict/sky-box/blue-sky/down.png',
};

/**
 * リソース管理オブジェクト
 */
export type Resources = {
  /** モデル */
    models: Model[],

  /** テクスチャ */
    textures: Texture[]
};

/**
 * モデル管理オブジェクト
 */
export type Model = {
  /** モデルのパス */
    path: string,

  /** 形状 */
    geometry: THREE.Geometry,

  /** 材質 */
    material: THREE.Material
};

/**
 * テクスチャ管理オブジェクト
 */
export type Texture = {
  /** テクスチャのパス */
    path: string,

  /** テクスチャ */
    texture: THREE.Texture
};

/**
 * リソース管理クラス
 */
export class ResourceManager {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** リソースのベースとなるパス */
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
}