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
  _disActiveButton: SimpleImageMesh;
  _overlap: ButtonOverlap;

  constructor(param: Param) {
    this._group = new THREE.Group();

    const activeResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_MINUS);
    const active = activeResource
      ? activeResource.image
      : new Image();
    this._activeButton = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: active
    });
    this._group.add(this._activeButton.getObject3D());

    const disActiveResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.DIS_ACTIVE_BATTERY_MINUS);
    const disActive = disActiveResource
      ? disActiveResource.image
      : new Image();
    this._disActiveButton = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: disActive
    });
    this._group.add(this._disActiveButton.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 80,
      segments: 32,
      listener: param.listener,
      onButtonPush: () => {
        param.onPush();
      }
    });
    this._group.add(this._overlap.getObject3D());
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    const isActive = false;
    const activeOpacity = isActive ? model.opacity : 0;
    const disActiveOpacity = isActive ? 0 : model.opacity;
    this._activeButton.setOpacity(activeOpacity);
    this._disActiveButton.setOpacity(disActiveOpacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}