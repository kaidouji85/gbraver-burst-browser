// @flow
import type {Resources} from '../../../common/resource-manager';
import * as THREE from 'three';
import R from 'ramda';
import {MODEL_PATHS} from '../../../common/resource-manager';
import {createMeshFromJson} from '../../../common/mesh-creator';
import TreeBillBoard from './tree-bill-board';
import GroundMesh from './ground-sand';
import FenceMesh from './fence';
import StoneFence from './stone-fence'

/**
 * 校舎セット
 */
export default class SchoolField {
  /** 木 */
  tree: TreeBillBoard[];

  /** 地面 */
  ground: THREE.Mesh;

  /** 校舎 */
  school: THREE.Mesh;

  /** フェンス */
  fences: THREE.Mesh[];

  /** 石垣 */
  stoneFence: THREE.Mesh[];

  constructor(resources: Resources) {
    this.tree = Trees(resources);
    this.ground = GroundMesh(resources);
    this.school = School(resources);
    this.fences = Fences(resources);
    this.stoneFence = StoneFence(resources);
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  values(): THREE.Object3D {
    return this.tree.map((item: TreeBillBoard) => item.mesh)
      .concat([this.ground])
      .concat([this.school])
      .concat(this.fences)
      .concat(this.stoneFence)
      ;
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

  // 左方向の木セット
  return createToZDirection(-540, 0, 11)
    .concat(createToZDirection(-540 + TREE_SIZE, 0, 10))
    // 右方向の木セット
    .concat(createToZDirection(540, 0, 11))
    .concat(createToZDirection(540 - TREE_SIZE, 0, 10));
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
  mesh.scale.set(0.3, 0.3, 0.3);
  return mesh;
}

/**
 * フェンス
 *
 * @param resources リソース管理オブジェクト
 * @return フェンス
 */
function Fences(resources: Resources): THREE.Mesh[] {
  const fence = (x, z) => {
    let mesh = FenceMesh(resources);
    Object.assign(mesh.position, {x, z});
    mesh.rotation.y =  -90 * Math.PI / 180;
    return mesh;
  };

  const left = R.times(index => fence(- 600, 500 - index * 100), 12);
  const right = R.times(index => fence(600, 500 - index * 100), 12);

  return left.concat(right);
}