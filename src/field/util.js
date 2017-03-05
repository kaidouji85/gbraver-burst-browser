/**
 * フィールド生成関連のユーティリティ
 */
import ThreeLib from 'three-js';
const THREE = ThreeLib();

/**
 * JSONから読み込んだデータからメッシュを生成するヘルパー関数
 *
 * @param {string} modelPath モデルのパス
 * @param {object[]} resources リソース管理オブジェクト
 * @return {object} 生成したメッシュ
 */
export function createMeshFromJson(modelPath, resources) {
  const model = resources.models.find(item => item.path === modelPath);

  if (!model) {
    return null;
  }

  let faceMat = new THREE.MeshFaceMaterial(model.mat);
  return new THREE.Mesh(model.geo, faceMat);
}