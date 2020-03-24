// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource";
import {BatteryButton} from "./battery-button";
import {BatteryMeter} from "./battery-merter";
import {BatteryPlus} from "./battery-plus";
import {BatteryMinus} from "./battery-minus";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {BatterySelectorModel} from "../model";
import type {PreRender} from "../../../action/game-loop/pre-render";

/** 全体のスケール */
const GROUP_SCALE = 0.3;

/** 右パディング */
const PADDING_RIGHT = 112;

/** 下パディング */
const PADDING_BOTTOM = 80;

/** パラメータ */
type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  onOkPush: () => void,
  onPlusPush: () => void,
  onMinusPush: () => void,
};

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  _button: BatteryButton;
  _meter: BatteryMeter;
  _plus: BatteryPlus;
  _minus: BatteryMinus;
  _group: THREE.Group;

  constructor(param: Param) {
    this._group = new THREE.Group();

    this._meter = new BatteryMeter(param.resources);
    this._meter.getObject3D().position.set(0, 288, -2);
    this._group.add(this._meter.getObject3D());

    this._button = new BatteryButton({
      resources: param.resources,
      listener: param.listener,
      onPush: () => {
        param.onOkPush();
      }
    });
    this._button.getObject3D().position.set(0, 0, -1);
    this._group.add(this._button.getObject3D());

    this._plus = new BatteryPlus({
      resources: param.resources,
      listener: param.listener,
      onPush: () => {
        param.onPlusPush();
      }
    });
    this._plus.getObject3D().position.set(256, 176, 0);
    this._group.add(this._plus.getObject3D());

    this._minus = new BatteryMinus({
      resources: param.resources,
      listener: param.listener,
      onPush: () => {
        param.onMinusPush();
      }
    });
    this._minus.getObject3D().position.set(-256, 176, 0);
    this._group.add(this._minus.getObject3D());

    this._group.scale.set(GROUP_SCALE, GROUP_SCALE, GROUP_SCALE);
  }

  /** デストラクタ */
  destructor(): void {
    this._button.destructor();
    this._meter.destructor();
    this._plus.destructor();
    this._minus.destructor();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** モデルをビューに反映させる */
  engage(model: BatterySelectorModel): void {
    this._meter.update(model);
    this._button.update(model);
    this._plus.update(model);
    this._minus.update(model);
  }

  /** プリレンダー */
  preRender(action: PreRender): void {
    const safeAreaHeight = action.rendererDOM.clientHeight - action.safeAreaInset.bottom;
    const devicePerScale = Math.max(1, Math.floor(safeAreaHeight / 375));

    this._group.scale.set(
      GROUP_SCALE * devicePerScale,
      GROUP_SCALE * devicePerScale,
      GROUP_SCALE * devicePerScale
      );
    this._group.position.x = action.rendererDOM.clientWidth / 2 - action.safeAreaInset.right - PADDING_RIGHT * devicePerScale;
    this._group.position.y = -action.rendererDOM.clientHeight / 2 + action.safeAreaInset.bottom + PADDING_BOTTOM * devicePerScale;
    this._group.quaternion.copy(action.camera.quaternion);
  }
}