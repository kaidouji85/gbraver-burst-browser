// @flow
import type {Resources} from '../../../resource/resource-manager';
import * as THREE from 'three';
import {TEXTURE_IDS} from "../../../resource/texture-manager";
import type {TextureManager} from "../../../resource/texture-manager";

const WIDTH =  9000;
const HEIGHT = 9000;
const DEPTH = 9000;
const SKY_BOX_TEXTURE_IDS = [
  TEXTURE_IDS.BLUE_SKY_RIGHT,
  TEXTURE_IDS.BLUE_SKY_LEFT,
  TEXTURE_IDS.BLUE_SKY_UP,
  TEXTURE_IDS.BLUE_SKY_DOWN,
  TEXTURE_IDS.BLUE_SKY_BACK,
  TEXTURE_IDS.BLUE_SKY_FRONT,
];

/**
 * 青空スカイボックス
 *
 * @param resources リソース管理クラス
 * @return 青空スカイボックス
 */
export default function BlueSky(resources: Resources): THREE.Mesh {
  const materials = SKY_BOX_TEXTURE_IDS
    .map(id => resources.textures.find(v => v.id === id))
    .map((textureManager: ?TextureManager) => textureManager ? textureManager.texture : new THREE.Texture())
    .map(texture => new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide}));
  let geometry = new THREE.CubeGeometry(WIDTH, HEIGHT, DEPTH, 32, 32, 32);
  let material = new THREE.MultiMaterial(materials);
  return new THREE.Mesh(geometry, material);
}