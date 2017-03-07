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
  let map = resources.textures.find(item => item.path === TEXURE_PATHS.TREE).texture;
  let material = new THREE.MeshBasicMaterial( {
    color: 0xffff00,
    side: THREE.DoubleSide,
    map,
    transparent: true
  } );
  return new THREE.Mesh( geometry, material );
}