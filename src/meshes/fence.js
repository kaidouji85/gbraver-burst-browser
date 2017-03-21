// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXURE_PATHS} from '../resource-manager';

const THREE = ThreeLib();
const HEIGHT = 100;
const WIDTH = 100;
const COLOR = 0x006400;

/**
 * 網
 *
 * @param resources リソース管理クラス
 * @returns 網
 */
function Network(resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 32, 32);

  let texture = resources.textures.find(item => item.path === TEXURE_PATHS.FENCE);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    alphaMap: texture ? texture.texture : new THREE.Texture(),
    color: new THREE.Color( COLOR )
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = WIDTH / 2;
  mesh.position.y = HEIGHT / 2;
  return mesh;
}

/**
 * 円柱
 *
 * @returns 円柱
 */
function Cylinder() {
  let cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, HEIGHT, 50),
    new THREE.MeshPhongMaterial({
      color: COLOR
    }));
  cylinder.position.x = WIDTH;
  cylinder.position.y = HEIGHT / 2;
  return cylinder;
}

/**
 * フェンスメッシュを生成する
 *
 * @param {object} resources リソース管理オブジェクト
 * @returns {THREE.Mesh}  フェンスメッシュ
 */
export default function Fence(resources: Resources): THREE.Mesh {
  let fence = new THREE.Group();

  fence.add(Network(resources));
  fence.add(Cylinder());

  return fence;
}