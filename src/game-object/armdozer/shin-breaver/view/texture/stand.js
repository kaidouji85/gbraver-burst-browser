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

  /** アアニメーション進捗に応じたテクスチャを返す */
  animate(animation: number): THREE.Texture {
    this._texture.offset.x = this._getTextureOffsetX(animation);
    this._texture.offset.y = 0;
    return this._texture;
  }

  /** テクスチャのオフセットXを計算する */
  _getTextureOffsetX(animation: number): number {
    const min = 0;
    const max = (MAX_ANIMATION - 1) / MAX_ANIMATION;
    const textureOffsetX = Math.floor(animation * MAX_ANIMATION) / MAX_ANIMATION;

    if (textureOffsetX < min) {
      return min;
    }

    if (max < textureOffsetX) {
      return max;
    }

    return textureOffsetX;
  }
}