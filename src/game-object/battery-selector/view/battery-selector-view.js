// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource";
import type {BatterySelectorModel} from "../model/battery-selector";
import {BatteryButton} from "./battery-button";

/** 全体のスケール */
const SCALE = 0.3;

/** 右パディング */
const PADDING_RIGHT = 96;

/** 下パディング */
const PADDING_BOTTOM = 80;

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  _button: BatteryButton;
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._button = new BatteryButton(resources);
    this._group.add(this._button.getObject3D());

    this._group.scale.set(SCALE, SCALE, SCALE);
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
    this._group.position.x = window.innerWidth / 2 - PADDING_RIGHT;
    this._group.position.y = -window.innerHeight / 2 + PADDING_BOTTOM;
  }
}