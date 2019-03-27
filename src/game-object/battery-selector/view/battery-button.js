// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {ButtonOverlap} from "../../../operation/button/button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {circleButtonOverlap} from "../../../operation/button/circle-button-overlap";

export const MESH_SIZE = 512;

// TODO 当たり判定を追加する
/** バッテリーボタン */
export class BatteryButton {
  _group: THREE.Group;
  _mesh: SimpleImageMesh;
  _overlap: ButtonOverlap;


  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._group = new THREE.Group();

    const imageResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON);
    const image = imageResource
      ? imageResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: image
    });
    this._group.add(this._mesh.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      listener: listener,
      onButtonPush: ()=> {
        console.log('clicked!!');
      }
    });
    this._group.add(this._overlap.getObject3D());
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}