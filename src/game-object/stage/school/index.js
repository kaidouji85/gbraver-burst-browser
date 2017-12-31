// @flow
import type {Resources} from '../../../resource/resource-manager';

import * as THREE from 'three';
import SchoolBuild from './school-build/index';
import SkyBox from './blue-sky';
import CityRoad from './city-road';
import {Stage} from '../base';
import {Mansions} from "./mansions";

/** 学校ステージ */
export default class SchoolStage implements Stage {
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
    this.road = CityRoad(resources);
    this.road.position.z = 760;

    this.lights = Light();
    this.mansions = Mansions(resources);
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): THREE.Object3D[] {
    return this.schoolBuild.getThreeJsObjects()
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
  gameLoop(camera: THREE.Camera): void {
    this.schoolBuild.gameLoop(camera);
  }
};

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

