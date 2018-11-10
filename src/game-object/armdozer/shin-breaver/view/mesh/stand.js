// @flow

import type {ArmdozerMesh} from "../../../common/armdozer-mesh";
import type {Resources} from "../../../../../resource";
import * as THREE from "three";
import type {TextureResource} from "../../../../../resource/texture";
import {TEXTURE_IDS} from "../../../../../resource/texture";
import {SPRITE_RENDER_ORDER} from "../../../../../mesh/render-order";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

export class ShinBraverStand implements ArmdozerMesh {
  _texture: THREE.Texture;
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND);
    this._texture = textureResource ? textureResource.texture : new THREE.Texture();

    const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: this._texture
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  animate(frame: number): void {
    // NOP
  }

  getObject3D(): THREE.Object3D {
    return this._mesh;
  }

}