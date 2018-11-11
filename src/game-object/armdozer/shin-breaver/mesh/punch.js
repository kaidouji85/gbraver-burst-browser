// @flow

import type {Resources} from "../../../../resource";
import * as THREE from "three";
import {shinBraverMaterial} from "./material";
import {SPRITE_RENDER_ORDER} from "../../../../mesh/render-order";
import {normalizeTextureOffset} from "../../../../texture/animation/texture-offset";
import {ANIMATED_TEXTURE_IDS} from "../../../../resource/animated-texture";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

/** シンブレイバーのパンチポーズ */
export class ShinBraverPunch {
  _texture: THREE.Texture;
  _maxAnimation: number;
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const textureResource = resources.animatedTextures.find(v => v.id === ANIMATED_TEXTURE_IDS.SHIN_BRAVER_PUNCH);
    this._texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._maxAnimation = textureResource ? textureResource.horizon : 1;

    const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
    const material = shinBraverMaterial(this._texture);
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.y = 150;
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  animate(frame: number): void {
    this._texture.offset.x = normalizeTextureOffset(frame, this._maxAnimation);
    this._texture.offset.y = 0;
  }

  visible(isVisible: boolean): void {
    this._mesh.material.opacity = isVisible ? 1 : 0;
  }

  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}