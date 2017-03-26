// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../resource-manager';

const THREE = ThreeLib();
const HEIGHT = 1200;
const WIDTH = 1200;

/**
 * 地面メッシュ(砂地)を生成する
 *
 * @param {object} resources リソース管理オブジェクト
 * @returns {THREE.Mesh}  地面メッシュ(砂地)
 */
export default function GroundOfSand(resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 32, 32);

  let texture = resources.textures.find(item => item.path === TEXTURE_PATHS.SAND);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: texture ? texture.texture : new THREE.Texture()
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 90 * Math.PI / 180;
  return mesh;
}