/**
 * ゲームで使うモデルを生成するヘルパー関数群
 */
import ThreeLib from 'three-js';
const THREE = ThreeLib();

/**
 * 校舎モデルを生成して返す
 */
export function School(resources) {
  const modelInfo = resources.models.find(item => item.path === 'model/school.json');

  if (!modelInfo) {
    return null;
  }

  let faceMat = new THREE.MeshFaceMaterial(modelInfo.mat);
  let model = new THREE.Mesh(modelInfo.geo, faceMat);
  model.position.set(0, -5, 0);
  model.scale.set(0.1, 0.1, 0.1);
  return model;
}

/**
 * 木セットモデルを生成して返す
 */
export function TreeSet(resources) {
  const modelInfo = resources.models.find(item => item.path === 'model/tree-set.json');

  if (!modelInfo) {
    return null;
  }

  let faceMat = new THREE.MeshFaceMaterial(modelInfo.mat);
  let model = new THREE.Mesh(modelInfo.geo, faceMat);
  model.position.set(0, -5, 0);
  model.scale.set(0.1, 0.1, 0.1);
  return model;
}