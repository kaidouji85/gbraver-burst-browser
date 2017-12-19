// @flow

import * as THREE from "three";
import type {Resources, Texture} from "../../../../resource/resource-manager";
import {createAnimatedTexture} from "../../../../util/texture/texture-animation";
import {TEXTURE_PATHS} from "../../../../resource/resource-manager";
import type {AnimationType} from "../base";

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
  const origin: ?Texture = resources.textures.find(item => item.path === TEXTURE_PATHS.SHIN_BRAVER_STAND);
  const texture = origin ? origin.texture : new THREE.Texture();
  return createAnimatedTexture(texture, 1, 1);
}

/** パンチ */
function createPunch(resources: Resources): THREE.Texture {
  const origin: ?Texture = resources.textures.find(item => item.path === TEXTURE_PATHS.SHIN_BRAVER_PUNCH);
  const texture = origin ? origin.texture : new THREE.Texture();
  return createAnimatedTexture(texture, 10, 1);
}