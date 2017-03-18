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
};

/**
 * テクスチャのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const TEXURE_PATHS = {
  TREE: 'pict/wood2.png',
  SAND: 'pict/ground_sand_6361_9134_Small.jpg'
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
  /** モデルID */
  id: string;

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
  /** テクスチャID */
  id: string;

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
    return Promise.all(func(TEXURE_PATHS))
      .then(textures => {
        this.resources.textures = textures;
        return this;
      });
  }
}