import * as THREE from "three";
import * as R from 'ramda';

/**
 * テクスチャのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const TEXTURE_PATHS = {
  // シンブレイバー関連
  SHIN_BRAVER_STAND: 'armdozer/shin-braver/stand.png',
  SHIN_BRAVER_PUNCH: 'armdozer/shin-braver/punch.png',

  // ネオランドーザ関連
  NEO_RANDOZER_STAND: 'armdozer/neo-landozer/stand.png',

  // 青空スカイボックス関連
  BLUE_SKY_FRONT: 'sky-box/blue-sky/front.png',
  BLUE_SKY_RIGHT: 'sky-box/blue-sky/right.png',
  BLUE_SKY_BACK: 'sky-box/blue-sky/back.png',
  BLUE_SKY_LEFT: 'sky-box/blue-sky/left.png',
  BLUE_SKY_UP: 'sky-box/blue-sky/up.png',
  BLUE_SKY_DOWN: 'sky-box/blue-sky/down.png',
};

/** テクスチャ管理オブジェクト */
export type Texture = {
  /** テクスチャのパス */
  path: string;

  /** テクスチャ */
  texture: THREE.Texture;
};

/**
 * テクスチャを読み込むヘルパー関数
 *
 * @aram path ファイルパス
 * @return  読み込み結果
 */
export function loadTexture(path: string): Promise<Texture> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(path, texture => resolve({path, texture})));
}

/**
 * 全てのテクスチャを読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllTexture(basePath: string): Texture[] {
  const paths: string[] = R.values(TEXTURE_PATHS);
  return await Promise.all(paths.map(v => loadTexture(`${basePath}${v}`)));
}