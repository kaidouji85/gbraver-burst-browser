// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import R from 'ramda';
import {MODEL_PATHS} from '../resource-manager';
import {createMeshFromJson} from '../meshes/util';
import TreeBillBoard from '../actors/tree-bill-board';
import GroundMesh from '../meshes/ground-of-sand';

const THREE = ThreeLib();

/**
 * 学校フィールド
 */
export default class SchoolField {
  /** 木 */
  tree: TreeBillBoard[];

  /** 地面 */
  ground: THREE.Mesh;

  /** 校舎 */
  school: THREE.Mesh;

  /** ライト */
  lights: THREE.Light[];

  constructor(resources: Resources) {
    this.tree = Trees(resources);
    this.ground = GroundMesh(resources);
    this.school = School(resources);
    this.lights = Light();
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  values(): THREE.Object3D {
    return this.tree.map((item: TreeBillBoard) => item.mesh)
      .concat([this.ground, this.school])
      .concat(this.lights);
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  animate(camera: THREE.Camera): void {
    this.tree.forEach(item => item.animate(camera));
  }
};

/**
 * 木セット
 *
 * @param resources リソース管理オブジェクト
 * @returns 木セット
 */
function Trees(resources: Resources): TreeBillBoard[] {
  const TREE_SIZE = 60;
  const createTree = (x: number, z: number) => {
    let actor = new TreeBillBoard(resources);
    Object.assign(actor.mesh.position, {x, z});
    return actor;
  }
  const createToXDirection = (x: number, z:number, count: number) => R.times(
    num => createTree(x + num * TREE_SIZE , z), count);
  const createToZDirection = (x: number, z:number, count: number) => R.times(
    num => createTree(x , z + num * TREE_SIZE), count);

  // 前方向の木セット
  return createToXDirection(-450, 600, 16)
    .concat(createToXDirection(-450, 600 - TREE_SIZE, 16))
    // 左方向の木セット
    .concat(createToZDirection(-450, 0, 10))
    .concat(createToZDirection(-450 - TREE_SIZE, 0, 10))
    // 右方向の木セット
    .concat(createToZDirection(450, 0, 10))
    .concat(createToZDirection(450 - TREE_SIZE, 0, 10))
    ;
}

/**
 * 校舎メッシュを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 校舎メッシュ
 */
function School(resources: Resources): THREE.Mesh {
  let mesh = createMeshFromJson(MODEL_PATHS.SCHOOL, resources);
  mesh.position.set(0, 0, 0);
  mesh.scale.set(1.2, 1.2, 1.2);
  return mesh;
}

/**
 * ライトを生成して返す
 *
 * @return 生成したライト
 */
function Light(): THREE.Light[] {
  var directionalLight = new THREE.DirectionalLight(0xFFFFCD, 0.8);
  directionalLight.position.set(0, 60, 200);
  var ambientLight = new THREE.AmbientLight(0xFFFFCD);

  return [directionalLight, ambientLight];
}