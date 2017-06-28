// @flow
import type {Resources} from '../../resource-manager';

import ThreeLib from 'three-js';
import SchoolBuild from './school-build';
import SkyBox from './blue-sky';
import CityRoad from './city-road';
import {createMeshFromJson} from '../../util/mesh-creator';
import {MODEL_PATHS} from '../../resource-manager';

const THREE = ThreeLib();

/**
 * 学校ステージ
 */
export default class SchoolField {
  /** スカイボックス（青空） */
  skyBox: THREE.Mesh;

  /** 校舎 */
  schoolBuild: SchoolBuild;

  /** 道路 */
  road: CityRoad;

  /** 光源 */
  lights: THREE.Light[];

  /** マンション群 */
  mansions: THREE.Mesh;

  constructor(resources: Resources) {
    this.schoolBuild = new SchoolBuild(resources);
    this.skyBox = SkyBox(resources);
    this.road = Road(resources);
    this.lights = Light();
    this.mansions = Mansions(resources);
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  values(): THREE.Object3D {
    return this.schoolBuild.values()
      .concat(this.skyBox)
      .concat(this.road)
      .concat(this.lights)
      .concat(this.mansions);
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  animate(camera: THREE.Camera): void {
    this.schoolBuild.animate(camera);
  }
};

/**
 * 道路セットを生成して返す
 *
 * @param resources リソース管理クラス
 * @returns 道路
 */
function Road(resources: Resources): Three.Mesh {
  let mesh = CityRoad(resources);
  mesh.position.z = 760;
  return mesh;
}

/**
 * ライトを生成して返す
 *
 * @return 生成したライト
 */
function Light(): THREE.Light[] {
  let directionalLight = new THREE.DirectionalLight(0xAAAAAA, 0.8);
  directionalLight.position.set(0, 60, 200);
  let ambientLight = new THREE.AmbientLight(0xAAAAAA);

  return [
    directionalLight,
    ambientLight
  ];
}

/**
 * マンションを生成して返す
 *
 * @param resources リソース管理クラス
 * @return マンション
 */
function Mansions(resources: Resources): THREE.Mesh[] {
  const mansion = (x: number, y:number, z: number): THREE.Mesh => {
    let mesh = createMeshFromJson(MODEL_PATHS.MANSION01, resources);
    mesh.position.set(x, y, z);
    mesh.scale.set(0.5, 0.5, 0.5);
    return mesh;
  };

  return [
    mansion(950, 0, 450),
    mansion(950, 0, 0),
    mansion(950, 0, -450),

    mansion(-950, 0, 450),
    mansion(-950, 0, 0),
    mansion(-950, 0, -450),
  ];
}