// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../resource-manager';

const THREE = ThreeLib();
const WIDTH = 320;
const HEIGHT = 320;

function createTexture(resources: Resources, textureName: string): THREE.Texture {
  // TODO テクスチャのクローンをつくる
  let texture = resources.textures.find(item => item.path === textureName);
  texture.texture.wrapS = THREE.RepeatWrapping;
  texture.texture.wrapT = THREE.RepeatWrapping;
  texture.texture.repeat.set(0.5, 0.5);
  texture.texture.offset.x = 0.5;
  texture.texture.offset.y = 0;
  return texture.texture;
}

/**
 * ロボ
 *
 * @param resources リソース管理オブジェクト
 * @param textureName テクスチャ名
 * @return ロボ
 */
export default function Robo(resources: Resources, textureName: string): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 1, 1);

  let texture = createTexture(resources, textureName);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture ? texture : new THREE.Texture()
  });

  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0, HEIGHT/2, 0)
  return mesh;
}