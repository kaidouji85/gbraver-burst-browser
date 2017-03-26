// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../resource-manager';

const THREE = ThreeLib();
const WIDTH = 320;
const HEIGHT = 320;

/**
 * ロボ
 *
 * @param resources リソース管理オブジェクト
 * @param textureName テクスチャ名
 * @return ロボ
 */
export default function Robo(resources: Resources, textureName: string): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 32, 32);

  let texture = resources.textures.find(item => item.path === textureName);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture ? texture.texture : new THREE.Texture()
  });

  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0, HEIGHT/2, 0)
  return mesh;
}