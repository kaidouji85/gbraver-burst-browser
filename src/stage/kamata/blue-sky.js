// @flow
import type {Resources} from '../../common/resource-manager';
import {TEXTURE_PATHS} from '../../common/resource-manager';
import * as THREE from 'three';

const WIDTH =  9000;
const HEIGHT = 9000;
const DEPTH = 9000;
const SKY_BOX_TEXTURE_PATHS = [
  TEXTURE_PATHS.BLUE_SKY_RIGHT,
  TEXTURE_PATHS.BLUE_SKY_LEFT,
  TEXTURE_PATHS.BLUE_SKY_UP,
  TEXTURE_PATHS.BLUE_SKY_DOWN,
  TEXTURE_PATHS.BLUE_SKY_BACK,
  TEXTURE_PATHS.BLUE_SKY_FRONT,
];

/**
 * 青空スカイボックス
 *
 * @param resources リソース管理クラス
 * @return 青空スカイボックス
 */
export default function BlueSky(resources: Resources): THREE.Mesh {
  const getTexture = path => {
    const texture = resources.textures.find(v => v.path === path);
    return texture ? texture.texture : new THREE.Texture();
  }
  const materials = SKY_BOX_TEXTURE_PATHS
    .map(path => getTexture(path))
    .map(texture => new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide}));

  let geometry = new THREE.CubeGeometry(WIDTH, HEIGHT, DEPTH, 32, 32, 32);
  let material = new THREE.MultiMaterial(materials);
  return new THREE.Mesh(geometry, material);
}