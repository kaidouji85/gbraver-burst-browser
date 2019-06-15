// @flow

import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import * as THREE from "three";
import {ButtonOverlap} from "../../../overlap/button/button-overlap";
import {circleButtonOverlap} from "../../../overlap/button/circle-button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {BatterySelectorModel} from "../model";
import {canBatteryMinusPush} from "../model/can-battery-minus-push";

/** メッシュサイズ */
const MESH_SIZE = 256;

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  onPush: () => void
};

/** バッテリーマイナスボタン */
export class BatteryMinus {
  _group: THREE.Group;
  _activeButton: SimpleImageMesh;
  _buttonDisabled: SimpleImageMesh;
  _overlap: ButtonOverlap;

  constructor(param: Param) {
    const activeResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_MINUS);
    const active = activeResource
      ? activeResource.image
      : new Image();
    this._activeButton = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: active
    });

    const buttonDisabledResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.SMALL_BUTTON_DISABLED);
    const buttonDisabled = buttonDisabledResource
      ? buttonDisabledResource.image
      : new Image();
    this._buttonDisabled = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: buttonDisabled
    });

    this._overlap = circleButtonOverlap({
      radius: 80,
      segments: 32,
      listener: param.listener,
      onButtonPush: () => {
        param.onPush();
      }
    });

    this._group = new THREE.Group();
    this._group.add(this._activeButton.getObject3D());
    this._group.add(this._buttonDisabled.getObject3D());
    this._group.add(this._overlap.getObject3D());
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    const isDisabled = canBatteryMinusPush(model) || model.disabled;
    const disActiveOpacity = isDisabled ? model.opacity : 0;
    this._activeButton.setOpacity(model.opacity);
    this._buttonDisabled.setOpacity(disActiveOpacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}