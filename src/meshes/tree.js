import ThreeLib from 'three-js';
import {TEXURE_PATHS} from '../resource-manager';
const THREE = ThreeLib();

/**
 * 木メッシュを生成する
 *
 * @param {object} resources リソース管理オブジェクト
 * @returns {THREE.Mesh}  木メッシュ
 */
export default function Tree(resources) {
  let geometry = new THREE.PlaneGeometry( 100, 100, 32 );

  let texture = resources.textures.find(item => item.path === TEXURE_PATHS.TREE);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture ? texture.texture : new THREE.Texture()
  });

  return new THREE.Mesh( geometry, material );
}