// @flow

/**
 * メッシュ関連のユーティリティ
 */
import type {Resources} from '../resource-manager'
import ThreeLib from 'three-js';
const THREE = ThreeLib();

/**
 * JSONから読み込んだデータからメッシュを生成するヘルパー関数
 *
 * @param modelPath モデルのパス
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function createMeshFromJson(modelPath: string, resources: Resources): THREE.MeshFaceMaterial {
  const model = resources.models.find(item => item.path === modelPath);

  if (!model) {
    return null;
  }

  let faceMat = new THREE.MeshFaceMaterial(model.material);
  return new THREE.Mesh(model.geometry, faceMat);
}