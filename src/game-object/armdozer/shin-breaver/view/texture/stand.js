// @flow

import type {ArmdozerAnimationTexture} from "../../../common/animation-texture";
import * as THREE from 'three';
import type {Resources} from "../../../../../resource/index";
import type {TextureResource} from "../../../../../resource/texture";
import {TEXTURE_IDS} from "../../../../../resource/texture";

/** 立ちアニメーション */
export class StandAnimationTexture implements ArmdozerAnimationTexture {
  _texture: THREE.Texture;

  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND);
    this._texture = textureResource ? textureResource.texture : new THREE.Texture();
  }

  /** アアニメーション進捗に応じたテクスチャを返す */
  animate(animation: number): THREE.Texture {
    return this._texture;
  }
}