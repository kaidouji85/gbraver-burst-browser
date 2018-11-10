// @flow

import type {Resources} from "../../../../resource";
import type {TextureResource} from "../../../../resource/texture";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import {shinBraverMaterial} from "./material";
import {SPRITE_RENDER_ORDER} from "../../../../mesh/render-order";
import {createAnimatedTexture} from "../../../../texture/animation/texture-animation";
import {normalizeTextureOffset} from "../../../../texture/animation/texture-offset";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;
export const MAX_ANIMATION = 16;

/** シンブレイバーのマイターンポーズ */
export class ShinBraverMyTurn {
  _texture: THREE.Texture;
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_MY_TURN);
    const originTexture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._texture = createAnimatedTexture(originTexture, MAX_ANIMATION, 1);

    const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
    const material = shinBraverMaterial(this._texture);
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.y = 150;
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  animate(frame: number): void {
    this._texture.offset.x = normalizeTextureOffset(frame, MAX_ANIMATION);
    this._texture.offset.y = 0;
  }

  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}