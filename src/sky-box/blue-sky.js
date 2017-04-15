// @flow
import type {Resources} from '../resource-manager';
import {TEXTURE_PATHS} from '../resource-manager';
import ThreeLib from 'three-js';

const THREE = ThreeLib();

const WIDTH =  1000;
const HEIGHT = 1000;
const DEPTH = 1000;
const SKY_BOX_TEXTURE_PATHS = [
  TEXTURE_PATHS.BLUE_SKY_UP,
  TEXTURE_PATHS.BLUE_SKY_FRONT,
  TEXTURE_PATHS.BLUE_SKY_RIGHT,
  TEXTURE_PATHS.BLUE_SKY_BACK,
  TEXTURE_PATHS.BLUE_SKY_LEFT,
  TEXTURE_PATHS.BLUE_SKY_DOWN,
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
  let material = new THREE.MeshFaceMaterial(materials);
  return new THREE.Mesh(geometry, material);
}