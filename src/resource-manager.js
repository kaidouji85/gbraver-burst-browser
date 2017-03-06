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
 * リソース管理クラス
 */
export class ResourceManager {
  constructor() {
    this.resources = {
      models: []
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