// @flow
import * as THREE from 'three';
import * as R from 'ramda';
import type {Resources} from '../../resource/resource-manager';
import {TEXTURE_PATHS} from '../../resource/resource-manager';
import {rectangle} from '../../uv-mapping/rectangle';

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

/** タイルマップ　普通の道路 */
const TILE_NUM_NORMAL_ROAD = 2;

/** タイルマップ　上段停止線 */
const TILE_NUM_UNDER_STOP_01 = 0;
const TILE_NUM_UNDER_STOP_02 = 1;

/** タイルマップ　下段停止線 */
const TILE_NUM_UPPER_STOP_01 = 3;
const TILE_NUM_UPPER_STOP_02 = 4;

/** 横断歩道 */
const TILE_NUM_CROSS_WALK_01 = 5;
const TILE_NUM_CROSS_WALK_02 = 6;

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
  rectangle({
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
    tile(-MESH_WIDTH/2, 0, TILE_NUM_CROSS_WALK_01),
    tile(MESH_WIDTH/2, 0, TILE_NUM_CROSS_WALK_02),

    tile(MESH_WIDTH/2 + MESH_WIDTH * 1, 0, TILE_NUM_UNDER_STOP_01),
    tile(MESH_WIDTH/2 + MESH_WIDTH * 2, 0, TILE_NUM_UNDER_STOP_02),

    tile(-MESH_WIDTH/2 - MESH_WIDTH * 1, 0, TILE_NUM_UPPER_STOP_02),
    tile(-MESH_WIDTH/2 - MESH_WIDTH * 2, 0, TILE_NUM_UPPER_STOP_01),
  ].concat(
    // カメラから向かって右
    R.times(n => tile(MESH_WIDTH/2 + MESH_WIDTH * (n+3), 0, TILE_NUM_NORMAL_ROAD), 40)
  ).concat(
    // カメラから向かって左
    R.times(n => tile(-MESH_WIDTH/2 - MESH_WIDTH * (n+3), 0, TILE_NUM_NORMAL_ROAD), 40)
  ).forEach(item => group.add(item));

  return group;
}