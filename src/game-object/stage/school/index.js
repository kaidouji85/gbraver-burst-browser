// @flow

import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import SkyBox from './blue-sky';
import {createSchoolBuild} from './school-build';
import {Stage} from "../stage";
import {createGround} from "./ground";
import {Observable} from "rxjs";

/** 学校ステージ */
export default class SchoolStage implements Stage {
  _skyBox: THREE.Mesh;
  _schoolBuild: THREE.Mesh;
  _ground: THREE.Mesh;
  _directionalLight: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;

  constructor(resources: Resources) {
    this._schoolBuild = createSchoolBuild(resources);
    this._skyBox = SkyBox(resources);
    this._ground = createGround(resources);
    this._ground.position.z = 400;

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
    return [
      this._schoolBuild,
      this._skyBox,
      this._ground,
      this._directionalLight,
      this._ambientLight
    ];
  }
};
