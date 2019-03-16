// @flow

import * as THREE from "three";
import {BatteryDial, MESH_SIZE as DIAL_SIZE} from "./battery-dial";
import type {Resources} from "../../../resource";
import type {BatterySelectorModel} from "../model/battery-selector";

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const dial = new BatteryDial(resources);
    dial.getObject3D().position.x = -DIAL_SIZE / 2;
    dial.getObject3D().position.y = DIAL_SIZE / 2;
    this._group.add(dial.getObject3D());
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
    this._group.position.x = window.innerWidth / 2;
    this._group.position.y = -window.innerHeight / 2;
  }
}