// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../mesh/canvas-mesh";
import type {Resources} from "../../resource";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {drawImageInCenter} from "../../canvas/draw/image-drawer";
import type {PreRender} from "../../action/game-loop/pre-render";

const CANVAS_SIZE = 512;
const MESH_SIZE = 512;

/** タイトルロゴビュー */
export class TitleLogoView {
  _canvasMesh: CanvasMesh;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });

    const titleResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TITLE_LOGO);
    const title: Image = titleResource
      ? titleResource.image
      : new Image();
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);

      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, title, dx, dy);
    });
  }

  /** プリレンダー */
  preRender(action: PreRender): void {
    this._setPos(action.rendererDOM);
    this._lookAt(action.camera);
  }

  /** 座標を調整する */
  _setPos(rendererDOM: HTMLElement): void {
    this._canvasMesh.mesh.position.x = 0;
    this._canvasMesh.mesh.position.y = rendererDOM.clientHeight / 2 - 128;
  }

  /** カメラの真正面を向く */
  _lookAt(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  /**
   * シーンに追加するオブジェクトを追加する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }
}