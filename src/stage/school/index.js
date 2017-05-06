// @flow
import type {Resources} from '../../resource-manager';
import ThreeLib from 'three-js';
import SchoolBuild from './school-build';
import SkyBox from './blue-sky';
import CityRoad from './city-road';

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

  constructor(resources: Resources) {
    this.schoolBuild = new SchoolBuild(resources);
    this.skyBox = SkyBox(resources);
    this.road = Road(resources);
    this.lights = Light();
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
      .concat(this.lights);
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
  mesh.position.z = 800;
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