// @flow
import type {Resources} from '../../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../../resource-manager';

const THREE = ThreeLib();

const WIDTH = 100;
const HEIGHT = 100;

const PICT_WIDTH = 256;
const PICT_HEIGHT = 256;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const tileMapping = (x: number, y: number): THREE.Vector[] => [
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * x, TILE_HEIGHT/PICT_HEIGHT * y),
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * (x + 1), TILE_HEIGHT/PICT_HEIGHT * y),
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * (x + 1), TILE_HEIGHT/PICT_HEIGHT * (y + 1)),
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * x, TILE_HEIGHT/PICT_HEIGHT * (y + 1)),
]

/**
 * 都会の道路
 *
 * @param resources リソース管理クラス
 * @return 都会の道路
 */
export default function CityRoad(resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 1, 1);
  let uvMapping = tileMapping(0, 4);
  geometry.faceVertexUvs[0][0] = [uvMapping[0], uvMapping[1], uvMapping[3]];
  geometry.faceVertexUvs[0][1] = [uvMapping[1], uvMapping[2], uvMapping[3]];

  let texture = resources.textures.find(item => item.path === TEXTURE_PATHS.CITY_LOAD);
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: texture ? texture.texture : new THREE.Texture(),
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -90 * Math.PI / 180;
  mesh.rotation.z = 90 * Math.PI / 180;

  return mesh;
}