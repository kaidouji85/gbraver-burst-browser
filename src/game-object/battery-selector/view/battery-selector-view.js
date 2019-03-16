// @flow

import * as THREE from "three";
import {BatteryDial, MESH_SIZE as DIAL_SIZE} from "./battery-dial";
import {BatteryButton, MESH_SIZE as BUTTON_SIZE} from "./battery-button";
import type {Resources} from "../../../resource";
import type {BatterySelectorModel} from "../model/battery-selector";

/** 右パディイング */
const PADDING_RIGHT = 20;

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  _button: BatteryButton;
  _dial: BatteryDial;
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._button = new BatteryButton(resources);
    this._button.getObject3D().position.x = -BUTTON_SIZE / 2 - PADDING_RIGHT;
    this._button.getObject3D().position.y = BUTTON_SIZE / 2;
    this._group.add(this._button.getObject3D());

    this._dial = new BatteryDial(resources);
    this._dial.getObject3D().position.x = -DIAL_SIZE / 2 - PADDING_RIGHT;
    this._dial.getObject3D().position.y = 110 + DIAL_SIZE / 2;
    this._group.add(this._dial.getObject3D());
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