import ThreeLib from 'three-js';
import {MODEL_PATHS} from '../resource-manager';
import {createMeshFromJson} from '../meshes/util';
import TreeMesh from '../meshes/tree';

const THREE = ThreeLib();

/**
 * 学校フィールドを生成する
 *
 * @param resources リソース管理オブジェクト
 * @returns {object[]} 学校フィールドに関連するオブジェクト群
 */
export default function SchoolField(resources) {
  return [
    Tree(resources),
    School(resources),
  ].concat(Light());
}

/**
 * 木メッシュ
 *
 * @param {object[]} resources リソース管理オブジェクト
 * @returns {THREE.Mesh} 木メッシュ
 */
function Tree(resources) {
  let mesh = TreeMesh(resources);
  mesh.position.set(0, 0, 200);
  return mesh;
}

/**
 * 校舎メッシュを生成する
 *
 * @param {object[]} resources リソース管理オブジェクト
 * @return {object} 校舎メッシュ
 */
function School(resources) {
  let mesh = createMeshFromJson(MODEL_PATHS.SCHOOL, resources);
  mesh.position.set(0, 0, 0);
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