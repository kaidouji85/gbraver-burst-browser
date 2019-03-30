// @flow

import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import * as THREE from "three";
import {ButtonOverlap} from "../../../overlap/button/button-overlap";
import {circleButtonOverlap} from "../../../overlap/button/circle-button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/** メッシュサイズ */
const MESH_SIZE = 256;

/** プラスボタン */
export class BatteryPlus {
  _group: THREE.Group;
  _mesh: SimpleImageMesh;
  _overlap: ButtonOverlap;


  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._group = new THREE.Group();

    const imageResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_PLUS);
    const image = imageResource
      ? imageResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: MESH_SIZE,
      image: image
    });
    this._group.add(this._mesh.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 80,
      segments: 32,
      listener: listener,
      onButtonPush: () => {
        console.log('click plus button.');
      }
    });
    this._group.add(this._overlap.getObject3D());
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}