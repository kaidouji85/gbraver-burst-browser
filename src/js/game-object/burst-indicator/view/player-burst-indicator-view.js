// @flow

import * as THREE from 'three';
import type {BurstIndicatorView} from "./burst-indicator-view";
import type {BurstIndicatorModel} from "../model/burst-indicator-model";
import type {Resources} from "../../../resource";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

/**
 * プレイヤーバーストインジケータビュー
 */
export class PlayerBurstIndicatorView implements BurstIndicatorView {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const imageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BURST);
    const image: Image = imageResource
      ? imageResource.image
      : new Image();
    // this._mesh = new SimpleImageMesh({
    //
    // });

  }

  engage(model: BurstIndicatorModel): void {

  }

  getObject3D(): THREE.Object3D {

  }

}