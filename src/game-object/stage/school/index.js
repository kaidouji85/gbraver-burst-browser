// @flow

import type {Resources} from '../../../resource/resource-manager';
import * as THREE from 'three';
import SkyBox from './blue-sky';
import {createSchoolBuild} from './school-build';
import {Stage} from "../base";

/** 学校ステージ */
export default class SchoolStage implements Stage {
  _skyBox: THREE.Mesh;
  _schoolBuild: THREE.Mesh;
  _directionalLight: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;

  constructor(resources: Resources) {
    this._schoolBuild = createSchoolBuild(resources);
    this._skyBox = SkyBox(resources);

    this._directionalLight = new THREE.DirectionalLight(0xAAAAAA, 0.8);
    this._directionalLight.position.set(0, 60, 200);

    this._ambientLight = new THREE.AmbientLight(0xAAAAAA);
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): THREE.Object3D[] {
    return [this._schoolBuild]
      .concat(this._skyBox)
      .concat(this._directionalLight)
      .concat(this._ambientLight)
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  gameLoop(camera: THREE.Camera): void {
    // NOP
  }
};
