// @flow

import type {ArmdozerAnimationTexture} from "../../../common/animation-texture";
import * as THREE from 'three';
import type {Resources} from "../../../../../resource/index";
import type {TextureResource} from "../../../../../resource/texture";
import {TEXTURE_IDS} from "../../../../../resource/texture";
import {createAnimatedTexture} from "../../../../../texture/animation/texture-animation";
import {normalizeTextureOffset} from "../../../../../texture/animation/texture-offset";

export const MAX_ANIMATION = 8;

/** 立ちアニメーション */
export class StandAnimationTexture implements ArmdozerAnimationTexture {
  _texture: THREE.Texture;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.NEO_LANDOZER_STAND);
    const originTexture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._texture = createAnimatedTexture(originTexture, MAX_ANIMATION, 1);
  }

  /** アアニメーション進捗に応じたテクスチャを返す */
  animate(animation: number): THREE.Texture {
    this._texture.offset.x = normalizeTextureOffset(animation, MAX_ANIMATION);
    this._texture.offset.y = 0;
    return this._texture;
  }
}