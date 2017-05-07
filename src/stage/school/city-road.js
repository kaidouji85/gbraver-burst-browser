// @flow
import ThreeLib from 'three-js';
import R from 'ramda';
import type {Resources} from '../../resource-manager';
import {TEXTURE_PATHS} from '../../resource-manager';

const THREE = ThreeLib();

const MESH_WIDTH = 50;
const MESH_HEIGHT = 325;

const PICT_WIDTH = 256;
const PICT_HEIGHT = 256;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 208;

/**
 * タイルマップのUV座標セットを計算して返す
 *
 * @param x xの位置
 * @param y yの位置
 * @return UV座標セット
 */
const uvMappingPostionSet = (x: number, y: number): THREE.Vector2[] => [
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * x, TILE_HEIGHT/PICT_HEIGHT * y),
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * (x + 1), TILE_HEIGHT/PICT_HEIGHT * y),
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * (x + 1), TILE_HEIGHT/PICT_HEIGHT * (y + 1)),
  new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * x, TILE_HEIGHT/PICT_HEIGHT * (y + 1)),
];

/**
 * タイルマップの平面を生成する
 *
 * @param mapX　タイルマップでのX座標
 * @param mapY　タイルマップでのY座標
 * @param resources　リソース管理クラス
 * @returns タイルマップ
 */
function createTileMesh(mapX:number, mapY: number, resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
  let uvMapping = uvMappingPostionSet(mapX, mapY);
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

/**
 * 都会の道路
 *
 * @param resources リソース管理クラス
 * @return 都会の道路
 */
export default function CityRoad(resources: Resources): THREE.Mesh {
  const tile = (posX: number, posZ: number, mapX: number, mapY: number): THREE.Mesh => {
    let mesh = createTileMesh(mapX, mapY, resources);
    mesh.position.x = posX;
    mesh.position.z = posZ;
    return mesh;
  };

  let group = new THREE.Group();
  [
    tile(MESH_WIDTH * 0, MESH_HEIGHT * 0, 0, 0),
    tile(MESH_WIDTH * 1, MESH_HEIGHT * 0, 1, 0),
  ].concat(
    R.range(2, 22).map(num => tile(MESH_WIDTH * num, MESH_HEIGHT * 0, 2, 0))
  ).concat(
    tile(MESH_WIDTH * 22, MESH_HEIGHT * 0, 3, 0),
    tile(MESH_WIDTH * 23, MESH_HEIGHT * 0, 4, 0),
  ).forEach(item => group.add(item));

  return group;
}