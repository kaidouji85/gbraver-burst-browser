// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXURE_PATHS} from '../resource-manager';

const THREE = ThreeLib();
const HEIGHT = 100;
const WIDTH = 100;

/**
 * フェンスメッシュを生成する
 *
 * @param {object} resources リソース管理オブジェクト
 * @returns {THREE.Mesh}  フェンスメッシュ
 */
export default function Fence(resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 32, 32);

  let texture = resources.textures.find(item => item.path === TEXURE_PATHS.FENCE);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    alphaMap: texture ? texture.texture : new THREE.Texture(),
    color: new THREE.Color( 0x006400 )
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = HEIGHT / 2;
  return mesh;
}