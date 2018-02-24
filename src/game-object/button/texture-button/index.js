// @flow
import * as THREE from "three";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {TextureResource} from "../../../resource/texture";
import {TextureButton} from "./texture-button";

/** コウゲキボタン */
export function AttackButton(resources: Resources): TextureButton {
  const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.ATTACK_BUTTON);
  const texture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
  return new TextureButton({
    texture,
    width: 100,
    height: 100,
    posX: 0,
    posY: 0
  });
}