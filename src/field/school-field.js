// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import R from 'ramda';
import {MODEL_PATHS} from '../resource-manager';
import {createMeshFromJson} from '../util/mesh-creator';
import TreeBillBoard from '../actors/tree-bill-board';
import GroundMesh from '../meshes/ground-of-sand';
import FenceMesh from '../meshes/fence';

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

  /** フェンス */
  fences: THREE.Mesh[];

  /** スタジアムライト */
  stadiumLights: THREE.Mesh[];

  /** 光源 */
  lights: THREE.Light[];

  constructor(resources: Resources) {
    this.tree = Trees(resources);
    this.ground = GroundMesh(resources);
    this.school = School(resources);
    this.stadiumLights = StadiumLights(resources);
    this.fences = Fences(resources);
    this.lights = Light();
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
      .concat(this.stadiumLights)
      .concat(this.fences)
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
  return createToXDirection(-540, 600, 19)
    .concat(createToXDirection(-540, 600 - TREE_SIZE, 19))
    // 左方向の木セット
    .concat(createToZDirection(-540, 0, 9))
    .concat(createToZDirection(-540 + TREE_SIZE, 0, 9))
    // 右方向の木セット
    .concat(createToZDirection(540, 0, 9))
    .concat(createToZDirection(540 - TREE_SIZE, 0, 9));
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
 * スタジアムライト
 *
 * @param resources リソース管理オブジェクト
 * @return スタジアムライト
 */
function StadiumLights(resources: Resources): THREE.Mesh[] {
  const light = (x, z) => {
    let mesh = createMeshFromJson(MODEL_PATHS.STADIUM_LIGHT, resources);
    mesh.rotation.y = 90 * Math.PI / 180;
    Object.assign(mesh.position, {x, z});
    return mesh;
  }
  const X_PADDING = 580;

  return [
    light(X_PADDING, 200),
    light(X_PADDING, 400),
    light(-X_PADDING, 200),
    light(-X_PADDING, 400),
  ];
}

/**
 * フェンス
 *
 * @param resources リソース管理オブジェクト
 * @return フェンス
 */
function Fences(resources: Resources): THREE.Mesh[] {
  const fence = (x, z, rotY) => {
    let mesh = FenceMesh(resources);
    Object.assign(mesh.position, {x, z});
    mesh.rotation.y = rotY;
    return mesh;
  };

  const front = R.times(index => fence(- 600 + index * 100 , 620, 0), 12);
  const left = R.times(index => fence(- 600, 520 - index * 100 , -90 * Math.PI / 180), 7);
  const right = R.times(index => fence(600, 620 - index * 100 , 90 * Math.PI / 180), 7);

  return front
    .concat(left)
    .concat(right);
}

/**
 * ライトを生成して返す
 *
 * @return 生成したライト
 */
function Light(): THREE.Light[] {
  var directionalLight = new THREE.DirectionalLight(0xAAAAAA, 0.8);
  directionalLight.position.set(0, 60, 200);
  var ambientLight = new THREE.AmbientLight(0xAAAAAA);

  return [
    directionalLight,
    ambientLight
  ];
}