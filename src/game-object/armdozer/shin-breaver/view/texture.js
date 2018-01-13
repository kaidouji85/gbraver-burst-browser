// @flow

import * as THREE from "three";
import type {Resources} from "../../../../resource/resource-manager";
import {createAnimatedTexture} from "../../../../util/texture/texture-animation";
import type {Texture} from "../../../../resource/loader/depricated-texture-loader";
import {TEXTURE_PATHS} from "../../../../resource/loader/depricated-texture-loader";
import type {AnimationType} from "../base";
import type {TextureManager} from "../../../../resource/texture-manager";
import {TEXTURE_IDS} from "../../../../resource/texture-manager";

/** シンブレイバーのテクスチャコンテナ */
export class ShinBraverTextureContainer {
  _stand: THREE.Texture;
  _punch: THREE.Texture;

  constructor(resources: Resources) {
    this._stand = createStand(resources);
    this._punch = createPunch(resources);
  }

  /** アニメ種別に対応するテクスチャを返す */
  _getTexture(type: AnimationType): THREE.Texture {
    switch (type) {
      case 'STAND':
      default:
        return this._stand;
    }
  }
}

/** 立ち */
function createStand(resources: Resources): THREE.Texture {
  const textureManager: ?TextureManager = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_STAND);
  const texture = textureManager ? textureManager.texture : new THREE.Texture();
  return createAnimatedTexture(texture, 1, 1);
}

/** パンチ */
function createPunch(resources: Resources): THREE.Texture {
  const origin: ?Texture = resources.depricated_textures.find(item => item.path === TEXTURE_PATHS.SHIN_BRAVER_PUNCH);
  const texture = origin ? origin.texture : new THREE.Texture();
  return createAnimatedTexture(texture, 10, 1);
}