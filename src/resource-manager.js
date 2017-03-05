import ThreeLib from 'three-js';
const THREE = ThreeLib(['JSONLoader']);

/**
 * JSONモデルを読み込む
 *
 * @param {string} path ファイルパス
 * @return {Promise<object>} 読み込み結果
 */
function loadModel(path) {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(path, (geo, mat) => resolve({path, geo, mat})));
}

const modelPaths = ['model/school.json', 'model/tree-set.json'];

/**
 * リソース管理クラス
 */
export default class ResourceManager {
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
    return Promise.all(modelPaths.map(path => loadModel(path)))
      .then(models => {
        this.resources.models = models;
        return this;
      });
  }
}