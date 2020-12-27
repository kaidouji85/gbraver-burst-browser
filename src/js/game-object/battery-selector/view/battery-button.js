// @flow

import * as THREE from 'three';
import * as R from 'ramda';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {ButtonOverlap} from "../../../overlap/button/button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {circleButtonOverlap} from "../../../overlap/button/circle-button-overlap";
import type {BatterySelectorModel} from "../model";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawNumberRight} from "../../../canvas/number/number";

/** メッシュサイズ */
export const MESH_SIZE = 512;

/** バッテリー現在値の最大値 */
export const MAX_BATTERY = 5;

/** バッテリー現在値メッシュ */
type BatteryValue = {
  value: number,
  mesh: CanvasMesh
};

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  onPush: () => void
};

/** バッテリーボタン */
export class BatteryButton {
  _group: typeof THREE.Group;
  _button: SimpleImageMesh;
  _overlap: ButtonOverlap;
  _attackLabel: SimpleImageMesh;
  _defenseLabel: SimpleImageMesh;
  _batteryValues: BatteryValue[];

  constructor(param: Param) {
    this._group = new THREE.Group();

    const buttonResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON);
    const button = buttonResource
      ? buttonResource.image
      : new Image();
    this._button = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      meshSize: MESH_SIZE,
      image: button
    });
    this._button.getObject3D().position.set(0, 0, -1);
    this._group.add(this._button.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      listener: param.listener,
      onButtonPush: ()=> {
        param.onPush();
      }
    });
    this._group.add(this._overlap.getObject3D());

    const attackLabelResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK);
    const attackLabel = attackLabelResource
      ? attackLabelResource.image
      : new Image();
    this._attackLabel = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      meshSize: MESH_SIZE,
      image: attackLabel
    });
    this._attackLabel.getObject3D().position.set(24, -96, 0);
    this._group.add(this._attackLabel.getObject3D());

    const defenseLabelResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_DEFENSE);
    const defenseLabel = defenseLabelResource
      ? defenseLabelResource.image
      : new Image();
    this._defenseLabel = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      meshSize: MESH_SIZE,
      image: defenseLabel
    });
    this._defenseLabel.getObject3D().position.set(24, -96, 0);
    this._group.add(this._defenseLabel.getObject3D());

    const currentBatteryResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_CURRENT_VALUE);
    const currentBattery = currentBatteryResource
      ? currentBatteryResource.image
      : new Image();
    this._batteryValues = R.times(R.identity, MAX_BATTERY + 1)
      .map(value => {
        const mesh = new CanvasMesh({
          canvasWidth: MESH_SIZE,
          canvasHeight: MESH_SIZE,
          meshWidth: MESH_SIZE,
          meshHeight: MESH_SIZE,
        });
        mesh.draw(context => {
          const dx = context.canvas.width / 2;
          const dy = context.canvas.height / 2;
          drawNumberRight(context, currentBattery, dx, dy, value);
        });
        mesh.getObject3D().position.set(0, -42, 0);
        return {
          value: value,
          mesh: mesh
        };
      });
    this._batteryValues.forEach(v => {
      this._group.add(v.mesh.getObject3D());
    })
  }

  /** デストラクタ */
  destructor(): void {
    this._button.destructor();
    this._overlap.destructor();
    this._attackLabel.destructor();
    this._defenseLabel.destructor();
    this._batteryValues.forEach(v => {
      v.mesh.destructor();
    });
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this._group.scale.set(
      model.batteryButtonScale,
      model.batteryButtonScale,
      1
    );

    const attackOpacity = model.label === 'Attack' ? model.opacity : 0;
    const defenseOpacity = model.label === 'Defense' ? model.opacity : 0;
    this._attackLabel.setOpacity(attackOpacity);
    this._defenseLabel.setOpacity(defenseOpacity);
    this._button.setOpacity(model.opacity);
    this._batteryValues.forEach(batteryValue => {
      const opacity = batteryValue.value === model.battery
        ? model.opacity
        : 0;
      const x = model.label === 'Attack' ? -90 : -96;
      batteryValue.mesh.setOpacity(opacity);
      batteryValue.mesh.getObject3D().position.x = x;
    });
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}
