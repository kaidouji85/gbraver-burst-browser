// flow
import type {Resources} from '../resource-manager';
import R from 'ramda';
import ThreeLib from 'three-js';
import {MODEL_PATHS} from '../resource-manager';
import {createMeshFromJson} from '../meshes/util';
import TreeMesh from '../meshes/tree';

const THREE = ThreeLib();

/**
 * 学校フィールド
 */
export default class SchoolField {
  /** 木 */
  tree: THREE.Mesh[];

  /** 校舎 */
  school: THREE.Mesh;

  /** ライト */
  lights: THREE.Light[];

  constructor(resources: Resources) {
    this.tree = [Tree(resources)];
    this.school = School(resources);
    this.light = Light();
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  values(): Object[] {
    const func = R.pipe(
      R.values,
      R.flatten
    );
    return func(this);
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  animate(camera: THREE.Camera): void {
    this.tree.forEach(item => item.quaternion.copy(camera.quaternion))
  }
};

/**
 * 木メッシュ
 *
 * @param resources リソース管理オブジェクト
 * @returns 木メッシュ
 */
function Tree(resources: Resources): THREE.Mesh {
  let mesh = TreeMesh(resources);
  mesh.position.set(0, 0, 200);
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
  mesh.scale.set(0.1, 0.1, 0.1);
  return mesh;
}

/**
 * ライトを生成して返す
 *
 * @return 生成したライト
 */
function Light(): Three.Light[] {
  var directionalLight = new THREE.DirectionalLight(0xFFFFCD, 0.8);
  directionalLight.position.set(0, 60, 200);
  var ambientLight = new THREE.AmbientLight(0xFFFFCD);

  return [directionalLight, ambientLight];
}