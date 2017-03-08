// @flow
import ThreeLib from 'three-js';
import R from 'ramda';

const THREE = ThreeLib(['JSONLoader']);

/**
 * モデルのパス定数
 */
export const MODEL_PATHS = {
  SCHOOL: 'model/school.json',
};

/**
 * テクスチャのパス定数
 */
export const TEXURE_PATHS = {
  TREE: 'model/wood2.png',
}

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

  constructor() {
    this.resources = {
      models: [],
      textures: [],
    };
  }

  /**
   * 本ゲームで使用するモデルをすべて読み込む
   *
   * @return 結果を返すPromise
   */
  loadModels(): Promise<ResourceManager> {
    const func = R.pipe(
      R.values,
      R.map(path => loadModel(path))
    );
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
      R.map(path => loadTexture(path))
    );
    return Promise.all(func(TEXURE_PATHS))
      .then(textures => {
        this.resources.textures = textures;
        return this;
      });
  }
}

/**
 * JSONモデルを読み込むヘルパー関数
 *
 * @param path ファイルパス
 * @return 読み込み結果
 */
function loadModel(path: string): Promise<Model> {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(path, (geometry, material) => resolve({path, geometry, material})));
}

/**
 * テクスチャを読み込むヘルパー関数
 *
 * @aram path ファイルパス
 * @return  読み込み結果
 *
 * @param path
 * @returns {Promise}
 */
function loadTexture(path: string): Promise<Texture> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(path, texture => resolve({path, texture})));
}