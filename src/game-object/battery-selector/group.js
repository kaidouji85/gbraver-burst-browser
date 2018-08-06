// @flow

import * as THREE from "three";

/** コンストラクタのパラメータ */
type Param = {
  slider: THREE.Object3D,
  window: THREE.Object3D,
};

/** バッテリーセレクタで使うthree.jsオブジェクトをGroupにまとめたもの */
export class Group {
  _group: THREE.Group;
  _slider: THREE.Object3D;
  _window: THREE.Object3D;

  constructor(param: Param) {
    this._group = new THREE.Group();

    this._window = param.window;
    this._window.position.z = -10;
    this._group.add(this._window);

    this._slider = param.slider;
    this._slider.position.y = 64;
    this._group.add(this._slider);
  }

  /** バッテリースライダーで使うthree.jsのオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** セレクタ全体の座標をブラウザ画面サイズから設定する */
  refreshPosition(): void {
    //this._group.position.x = window.innerWidth / 2;
    //this._group.position.y = window.innerHeight / 2;
  }
}