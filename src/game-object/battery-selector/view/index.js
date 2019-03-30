// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource";
import type {BatterySelectorModel} from "../model/battery-selector";
import {BatteryButton} from "./battery-button";
import {BatteryMeter} from "./battery-merter";
import {BatteryPlus} from "./battery-plus";
import {BatteryMinus} from "./battery-minus";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/** 全体のスケール */
const SCALE = 0.3;

/** 右パディング */
const PADDING_RIGHT = 112;

/** 下パディング */
const PADDING_BOTTOM = 80;

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  _button: BatteryButton;
  _meter: BatteryMeter;
  _plus: BatteryPlus;
  _minus: BatteryMinus;
  _group: THREE.Group;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._group = new THREE.Group();

    this._meter = new BatteryMeter(resources);
    this._meter.getObject3D().position.set(0, 288, -2);
    this._group.add(this._meter.getObject3D());

    this._button = new BatteryButton(resources, listener);
    this._button.getObject3D().position.set(0, 0, -1);
    this._group.add(this._button.getObject3D());

    this._plus = new BatteryPlus(resources, listener);
    this._plus.getObject3D().position.set(256, 176, 0);
    this._group.add(this._plus.getObject3D());

    this._minus = new BatteryMinus(resources, listener);
    this._minus.getObject3D().position.set(-256, 176, 0);
    this._group.add(this._minus.getObject3D());

    this._group.scale.set(SCALE, SCALE, SCALE);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  // TODO モデルを参照するようにする
  /** モデルをビューに反映させる */
  engage(model: BatterySelectorModel): void {
    this._meter.setValue(2/5);
    this._setPos();
  }

  /** 座標を調整する */
  _setPos(): void {
    this._group.position.x = window.innerWidth / 2 - PADDING_RIGHT;
    this._group.position.y = -window.innerHeight / 2 + PADDING_BOTTOM;
  }
}