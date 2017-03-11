// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
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
    this.tree = [Tree(resources)];
    this.ground = Ground(resources);
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
 * 木メッシュ
 *
 * @param resources リソース管理オブジェクト
 * @returns 木メッシュ
 */
function Tree(resources: Resources): THREE.Mesh {
  let actor = new TreeBillBoard(resources);
  actor.mesh.position.z = 200;
  return actor;
}

function Ground(resources: Resources): THREE.Mesh {
  let mesh = GroundMesh(resources);
  return mesh;
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