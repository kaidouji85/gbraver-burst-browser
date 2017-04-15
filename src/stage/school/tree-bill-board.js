// @flow
import type {Resources} from '../../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../../resource-manager';

const THREE = ThreeLib();
const HEIGHT = 60;
const WIDTH = 60;

/**
 * 木メッシュを生成する
 *
 * @param {object} resources リソース管理オブジェクト
 * @returns {THREE.Mesh}  木メッシュ
 */
function Tree(resources: Resources): THREE.Mesh{
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 32, 32);

  let texture = resources.textures.find(item => item.path === TEXTURE_PATHS.TREE);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture ? texture.texture : new THREE.Texture()
  });

  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0, HEIGHT/2 - 4, 0)
  return mesh;
}

/**
 * 木（ビルボード）
 */
export default class TreeBillBoard {
  /** メッシュ */
  mesh: THREE.Mesh;

  constructor(resources: Resources): void {
    this.mesh = Tree(resources);
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  animate(camera: THREE.Camera): void {
    this.mesh.quaternion.copy(camera.quaternion)
  }
}
