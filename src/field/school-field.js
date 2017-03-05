import ThreeLib from 'three-js';
import {createMeshFromJson} from './util';

const THREE = ThreeLib();

/**
 * 学校フィールドを生成する
 *
 * @param resources リソース管理オブジェクト
 * @returns {object[]} 学校フィールドに関連するオブジェクト群
 */
export default function SchoolField(resources) {
  return [
    School(resources),
    TreeSet(resources)]
    .concat(Light())
    .filter(item => !!item);
}

/**
 * 校舎メッシュを生成する
 *
 * @param {object[]} resources リソース管理オブジェクト
 * @return {object} 校舎メッシュ
 */
function School(resources) {
  let mesh = createMeshFromJson('model/school.json', resources);

  if (!mesh) {
    return null;
  }

  mesh.position.set(0, -5, 0);
  mesh.scale.set(0.1, 0.1, 0.1);
  return mesh;
}

/**
 * 木セットメッシュを生成する
 *
 * @param {object[]} resources リソース管理オブジェクト
 * @return {object} 校舎メッシュ
 */
function TreeSet(resources) {
  let mesh = createMeshFromJson('model/tree-set.json', resources);

  if (!mesh) {
    return null;
  }

  mesh.position.set(0, 0, 100);
  mesh.scale.set(0.1, 0.1, 0.1);
  return mesh;
}

/**
 * ライトを生成して返す
 *
 * @return {object[]} 生成したライト
 */
function Light() {
  var directionalLight = new THREE.DirectionalLight(0xFFFFCD, 0.8);
  directionalLight.position.set(0, 60, 200);
  var ambientLight = new THREE.AmbientLight(0xFFFFCD);

  return [directionalLight, ambientLight];
}