// @flow

import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import type {Resources} from "../../../../resource/index";
import * as THREE from "three";
import type {TextureResource} from "../../../../resource/texture";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {SPRITE_RENDER_ORDER} from "../../../../mesh/render-order";
import {neoLandozerMaterial} from "./material";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

/** ネオランドーザ立ちポーズ */
export class NeoLandozerStand implements ArmdozerMesh {
  _texture: THREE.Texture;
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.NEO_LANDOZER_STAND);
    this._texture = textureResource ? textureResource.texture : new THREE.Texture();

    const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
    const material = neoLandozerMaterial(this._texture);
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.y = 150;
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  animate(frame: number): void {
    // NOP
  }

  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}