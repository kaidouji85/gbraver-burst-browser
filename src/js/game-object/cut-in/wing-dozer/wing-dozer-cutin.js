// @flow

import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import * as THREE from "three";

/** メッシュの大きさ */
export const MESH_SIZE = 800;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/**
 * ウィングドーザ カットイン
 */
export class WingDozerCutin {
  _cutInDown: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const cutInDownResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.WING_DOZER_BURST_UP);
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
    this._cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });
  }

  destructor(): void {
    this._cutInDown.destructor();
  }

  getObject3D(): THREE.Object3D {
    return this._cutInDown.getObject3D();
  }
}