// @flow

import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import {createAnimatedTexture} from "../../../../texture/animation/texture-animation";
import type {AnimationType} from "../model/neo-landozer-model";
import {ANIMATION_STAND} from "../model/neo-landozer-model";
import type {TextureResource} from "../../../../resource/texture";
import {TEXTURE_IDS} from "../../../../resource/texture";

/** ネオランドーザのテクスチャコンテナ */
export class NeoLandozerTextureContainer {
  _stand: THREE.Texture;
  _punch: THREE.Texture;

  constructor(resources: Resources) {
    this._stand = createStand(resources);
    this._punch = createPunch(resources);
  }

  /** アニメ種別に対応するテクスチャを返す */
  _getTexture(type: AnimationType): THREE.Texture {
    switch (type) {
      case ANIMATION_STAND:
      default:
        return this._stand;
    }
  }
}

/** 立ち */
function createStand(resources: Resources): THREE.Texture {
  const textureManager: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.NEO_LANDOZER_STAND);
  const texture = textureManager ? textureManager.texture : new THREE.Texture();
  return createAnimatedTexture(texture, 1, 1);
}

// TODO ネオランドーザのものと置き換える
/** パンチ */
function createPunch(resources: Resources): THREE.Texture {
  const textureManager: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_PUNCH);
  const texture = textureManager ? textureManager.texture : new THREE.Texture();
  return createAnimatedTexture(texture, 10, 1);
}