// @flow
import ThreeLib from 'three-js';
import type {Resources} from '../../resource-manager';
import {TEXTURE_PATHS} from '../../resource-manager';
import {setUvMapping} from '../../util/uv-mapper';

const THREE = ThreeLib();

/** メッシュ幅 */
const MESH_WIDTH = 50;
/** メッシュ高さ */
const MESH_HEIGHT = 325;

/** テクスチャ画像ファイルの幅(ピクセル) */
const PICT_WIDTH = 256;
/** テクスチャ画像ファイルの高さ(ピクセル) */
const PICT_HEIGHT = 256;

/** タイルマップの単位幅(ピクセル) */
const TILE_WIDTH = 32;
/** タイルマップの単位高さ(ピクセル) */
const TILE_HEIGHT = 208;

const TILE_NUM_NORMAL_ROAD = 2;

/**
 * タイルマップの平面を生成する
 * タイルマップの番号は左下から0でスタートし、右に進むごとに+1されていく
 *
 * @param tileNum タイルマップの番号
 * @param resources　リソース管理クラス
 * @returns タイルマップ
 */
function createTileMesh(tileNum: number, resources: Resources): THREE.Mesh {
  let geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
  setUvMapping({
    geo: geometry,
    p1: new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * tileNum, 0),
    p2: new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * (tileNum + 1), 0),
    p3: new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * (tileNum + 1), TILE_HEIGHT/PICT_HEIGHT),
    p4: new THREE.Vector2(TILE_WIDTH/PICT_WIDTH * tileNum, TILE_HEIGHT/PICT_HEIGHT),
  });

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
  const tile = (x: number, z: number, tileNum: number): THREE.Mesh => {
    let mesh = createTileMesh(tileNum, resources);
    mesh.position.x = x;
    mesh.position.z = z;
    return mesh;
  };

  let group = new THREE.Group();

  [
    // 真ん中
    tile(0, 0, TILE_NUM_NORMAL_ROAD),


  ].forEach(item => group.add(item));

  /*
  [
    tile(MESH_WIDTH * 0, MESH_HEIGHT * 0, 0, 0),
    tile(MESH_WIDTH * 1, MESH_HEIGHT * 0, 1, 0),
  ].concat(
    R.range(2, 22).map(num => tile(MESH_WIDTH * num, MESH_HEIGHT * 0, 2, 0))
  ).concat(
    tile(MESH_WIDTH * 22, MESH_HEIGHT * 0, 3, 0),
    tile(MESH_WIDTH * 23, MESH_HEIGHT * 0, 4, 0),
  ).forEach(item => group.add(item));
  */

  return group;
}