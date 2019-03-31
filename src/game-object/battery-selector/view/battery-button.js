// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {ButtonOverlap} from "../../../overlap/button/button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {circleButtonOverlap} from "../../../overlap/button/circle-button-overlap";
import type {ButtonLabel} from "../model/button-label";
import type {BatterySelectorModel} from "../model";

/** メッシュサイズ */
export const MESH_SIZE = 512;

/** バッテリーボタン */
export class BatteryButton {
  _group: THREE.Group;
  _button: SimpleImageMesh;
  _overlap: ButtonOverlap;
  _attackLabel: SimpleImageMesh;
  _defenseLabel: SimpleImageMesh;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._group = new THREE.Group();

    const buttonResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON);
    const button = buttonResource
      ? buttonResource.image
      : new Image();
    this._button = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: button
    });
    this._button.getObject3D().position.set(0, 0, -1);
    this._group.add(this._button.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      listener: listener,
      onButtonPush: ()=> {
        console.log('clicked!!');
      }
    });
    this._group.add(this._overlap.getObject3D());

    const attackLabelResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK);
    const attackLabel = attackLabelResource
      ? attackLabelResource.image
      : new Image();
    this._attackLabel = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: attackLabel
    });
    this._attackLabel.getObject3D().position.set(0, -96, 0);
    this._group.add(this._attackLabel.getObject3D());

    const defenseLabelResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK);
    const defenseLabel = defenseLabelResource
      ? defenseLabelResource.image
      : new Image();
    this._defenseLabel = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: defenseLabel
    });
    this._defenseLabel.getObject3D().position.set(0, -96, 0);
    this._group.add(this._defenseLabel.getObject3D());
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    const attackOpacity = model.label === 'Attack' ? model.opacity : 0;
    const defenseOpacity = model.label === 'Defense' ? model.opacity : 0;
    this._attackLabel.setOpacity(attackOpacity);
    this._defenseLabel.setOpacity(defenseOpacity);
    this._button.setOpacity(model.opacity);
  };

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}