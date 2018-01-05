import * as THREE from "three";

/**
 * JSONモデルを読み込むヘルパー関数
 *
 * @param path ファイルパス
 * @return 読み込み結果
 */
export function loadJsonModel(path: string): Promise<{ geometry: THREE.Geometry, material: THREE.Material }> {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(path, (geometry, material) => resolve({geometry, material})));
}