// @flow
import * as THREE from "three";
import * as R from 'ramda';

/**
 * テクスチャのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const TEXTURE_PATHS = {
  // ネオランドーザ関連
  NEO_RANDOZER_STAND: 'armdozer/neo-landozer/stand.png',

  // 青空スカイボックス関連
  BLUE_SKY_FRONT: 'sky-box/blue-sky/front.png',
  BLUE_SKY_RIGHT: 'sky-box/blue-sky/right.png',
  BLUE_SKY_BACK: 'sky-box/blue-sky/back.png',
  BLUE_SKY_LEFT: 'sky-box/blue-sky/left.png',
  BLUE_SKY_UP: 'sky-box/blue-sky/up.png',
  BLUE_SKY_DOWN: 'sky-box/blue-sky/down.png',

  // タイルマップ関連
  TILE_MAP_SCHOOL_GROUND: 'tile-map/school-ground/map.png',
};

/** テクスチャ管理オブジェクト */
export type Texture = {
  /** テクスチャのパス */
  path: string,
  /** テクスチャ */
  texture: THREE.Texture,
};

/**
 * テクスチャを読み込むヘルパー関数
 *
 * @param basePath ベースとなるパス
 * @aram path 読み込むファイルのパス
 * @return  読み込み結果
 */
export function loadTexture(basePath: string, path: string): Promise<Texture> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(`${basePath}${path}`, texture => resolve({path, texture})));
}

/**
 * 全てのテクスチャを読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllTexture(basePath: string): Promise<Texture[]> {
  const paths: string[] = R.values(TEXTURE_PATHS);
  return await Promise.all(paths.map(path => loadTexture(basePath, path)));
}
