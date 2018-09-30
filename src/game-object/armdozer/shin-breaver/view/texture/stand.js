// @flow

import type {ArmdozerAnimation} from "../../../common/armdozer-animation";
import * as THREE from 'three';
import type {Resources} from "../../../../../resource/index";
import {TEXTURE_IDS} from "../../../../../resource/texture";
import type {TextureResource} from "../../../../../resource/texture";
import {createAnimatedTexture} from "../../../../../texture/texture-animation";

export const MAX_ANIMATION = 10;

/** 立ちアニメーション */
export class StandAnimationTexture implements ArmdozerAnimation {
  _texture: THREE.Texture;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND);
    const originTexture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._texture = createAnimatedTexture(originTexture, 1, 1);
  }

  set(animation: number): THREE.Texture {
    //this._texture.offset.x = Math.round(MAX_ANIMATION * animation) / MAX_ANIMATION;
    //this._texture.offset.y = 0;
    return this._texture;
  }
}