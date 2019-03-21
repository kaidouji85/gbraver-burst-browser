// @flow

import * as THREE from "three";
import {BatteryButton, MESH_SIZE as BUTTON_SIZE} from "./battery-button";
import type {Resources} from "../../../resource";
import type {BatterySelectorModel} from "../model/battery-selector";

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  _button: BatteryButton;
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._button = new BatteryButton(resources);
    this._group.add(this._button.getObject3D());
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  // TODO モデルを参照するようにする
  /** モデルをビューに反映させる */
  engage(model: BatterySelectorModel): void {
    this._setPos();
  }

  /** 座標を調整する */
  _setPos(): void {
    this._group.position.x = window.innerWidth / 2 - BUTTON_SIZE / 2 + 48;
    this._group.position.y = -window.innerHeight / 2 + 130;
  }
}