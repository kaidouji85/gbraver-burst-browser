// @flow

import {TextureButtonView} from "./texture-button-view";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {TextureResource} from "../../../../resource/texture";
import * as THREE from "three";
import type {TextureButtonModel} from "../model/texture-button-model";

export const WIDTH = 100;
export const HEIGHT = 100;

/** コウゲキボタンビュー */
export class AttackButtonView extends TextureButtonView {
  constructor(resources: Resources) {
    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.ATTACK_BUTTON);
    const texture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
    super({
      texture,
      width: WIDTH,
      height: HEIGHT
    });
  }

  gameLoop(model: TextureButtonModel): void {
    super.gameLoop(model);
    this._mesh.position.y = -window.innerHeight / 2 + 64;
  }
}