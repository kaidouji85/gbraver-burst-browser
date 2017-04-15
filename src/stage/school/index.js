// @flow
import type {Resources} from '../../resource-manager';
import ThreeLib from 'three-js';
import SchoolBuild from './school-build';
import SkyBox from './blue-sky';

const THREE = ThreeLib();

/**
 * 学校ステージ
 */
export default class SchoolField {
  /** スカイボックス（青空） */
  skyBox: THREE.Mesh;

  /** 校舎 */
  schoolBuild: SchoolBuild;

  /** 光源 */
  lights: THREE.Light[];

  constructor(resources: Resources) {
    this.schoolBuild = new SchoolBuild(resources);
    this.skyBox = SkyBox(resources);
    this.lights = Light();
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  values(): THREE.Object3D {
    return this.schoolBuild.values()
      .concat([this.skyBox])
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