// @flow

import * as THREE from "three";
import * as R from 'ramda';

/**
 * モデルのパス定数
 *
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const MODEL_PATHS = {
};

/** モデル管理オブジェクト */
export type Model = {
  /** モデルのパス */
  path: string,
  /** 形状 */
  geometry: THREE.Geometry,
  /** 材質 */
  material: THREE.Material,
};

/**
 * JSONモデルを読み込むヘルパー関数
 *
 * @param basePath ベースとなるパス
 * @param path 読み込むファイルのパス
 * @return 読み込み結果
 */
export function loadJsonModel(basePath: string, path: string): Promise<Model> {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(`${basePath}${path}`, (geometry, material) => resolve({path, geometry, material})));
}

/**
 * 全てのJSONモデルを読み込む
 *
 * @param basePath リソースのベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllJsonModel(basePath: string): Model[] {
  const paths: string[] = R.values(MODEL_PATHS);
  return await Promise.all(paths.map(path => loadJsonModel(basePath, path)));
}
