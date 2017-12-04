// @flow
import type {Resources} from '../../../resource/resource-manager';
import {TEXTURE_PATHS} from '../../../resource/resource-manager';
import * as THREE from 'three';

const HEIGHT = 1200;
const WIDTH = 1200;

/**
 * テクスチャデータを生成して返す
 *
 * @param resources リソース管理オブジェクト
 * @return 地面テクスチャ
 */
function createTexture(resources: Resources): THREE.Texture {
  let origin = resources.textures.find(item => item.path === TEXTURE_PATHS.GROUND_SAND);
  let texture = origin ? origin.texture.clone() : new THREE.Texture();
  texture.needsUpdate = true;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * 地面メッシュ(砂地)を生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 地面メッシュ(砂地)
 */
export default function GroundOfSand(resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 32, 32);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: createTexture(resources)
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 90 * Math.PI / 180;
  return mesh;
}