// @flow

import type {ArmdozerAnimationTexture} from "../../../common/animation-texture";
import * as THREE from 'three';
import type {Resources} from "../../../../../resource/index";
import {TEXTURE_IDS} from "../../../../../resource/texture";
import type {TextureResource} from "../../../../../resource/texture";
import {createAnimatedTexture} from "../../../../../texture/texture-animation";

export const MAX_ANIMATION = 10;

/** 立ちアニメーション */
export class StandAnimationTexture implements ArmdozerAnimationTexture {
  _texture: THREE.Texture;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND);
    const originTexture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._texture = createAnimatedTexture(originTexture, MAX_ANIMATION, 1);
  }

  animate(animation: number): THREE.Texture {
    const frameNo = Math.min(MAX_ANIMATION - 1, Math.floor(MAX_ANIMATION * animation));
    const offsetX = frameNo / MAX_ANIMATION;
    this._texture.offset.x = offsetX;
    this._texture.offset.y = 0;
    return this._texture;
  }
}