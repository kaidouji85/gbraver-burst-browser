// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXURE_PATHS} from '../resource-manager';

const THREE = ThreeLib();
const HEIGHT = 100;
const WIDTH = 100;

/**
 * 木メッシュを生成する
 *
 * @param {object} resources リソース管理オブジェクト
 * @returns {THREE.Mesh}  木メッシュ
 */
export default function Tree(resources: Resources): THREE.Mesh{
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 32, 32);

  let texture = resources.textures.find(item => item.path === TEXURE_PATHS.TREE);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture ? texture.texture : new THREE.Texture()
  });

  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0, HEIGHT/2 - 4, 0)
  return mesh;
}