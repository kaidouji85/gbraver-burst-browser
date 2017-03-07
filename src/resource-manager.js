import ThreeLib from 'three-js';
import R from 'ramda';

const THREE = ThreeLib(['JSONLoader']);

/**
 * モデルのパス定数
 */
export const MODEL_PATHS = {
  SCHOOL: 'model/school.json',
  TREE_SET: 'model/tree-set.json'
};

/**
 * テクスチャのパス定数
 */
export const TEXURE_PATHS = {
  TREE: 'model/wood2.png',
}

/**
 * リソース管理クラス
 */
export class ResourceManager {
  constructor() {
    this.resources = {
      models: [],
      textures: [],
    };
  }

  /**
   * 本ゲームで使用するモデルをすべて読み込む
   *
   * @return {Promise<ResourceManager>} 結果を返すPromise
   */
  loadModels() {
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

  loadTextures() {
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
 * @param {string} path ファイルパス
 * @return {Promise<object>} 読み込み結果
 */
function loadModel(path) {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(path, (geo, mat) => resolve({path, geo, mat})));
}

/**
 * テクスチャを読み込むヘルパー関数
 *
 * @aram {string} path ファイルパス
 * @return {Promise<object>} 読み込み結果
 *
 * @param path
 * @returns {Promise}
 */
function loadTexture(path) {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(path, texture => resolve({path, texture})));
}