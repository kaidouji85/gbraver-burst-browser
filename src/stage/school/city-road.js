// @flow
import type {Resources} from '../../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../../resource-manager';

const THREE = ThreeLib();
const HEIGHT = 1200;
const WIDTH = 300;

/**
 * テクスチャを生成して返す
 *
 * @param texture
 */
function createTexture(resources: Resources): Three.Texture {
  let origin = resources.textures.find(item => item.path === TEXTURE_PATHS.CITY_LOAD);
  let texture = origin.texture.clone();

  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  //texture.repeat.set(0.5, 0.5);

  return texture;
}

/**
 * 都会の道路
 *
 * @param resources リソース管理クラス
 * @return 都会の道路
 */
export default function CityRoad(resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 32, 32);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: createTexture(resources),
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -90 * Math.PI / 180;
  return mesh;
}