// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../mesh/canvas-mesh";
import type {Resources} from "../../resource";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../../canvas/draw/image-drawer";

const CANVAS_SIZE = 512;
const MESH_SIZE = 200;

/** タイトルロゴビュー */
export class TitleLogoView {
  _mesh: CanvasMesh;

  constructor(resources: Resources) {
    this._mesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });

    const titleResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TITLE_LOGO);
    const title: Image = titleResource
      ? titleResource.image
      : new Image();
    this._mesh.draw(context => {
      const dx = context.width / 2;
      const dy = context.height / 2;
      drawImageInCenter(context, title, dx, dy);
    });
  }

  /**
   * シーンに追加するオブジェクトを追加する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}