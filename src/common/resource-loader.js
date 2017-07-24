// @flow
import ThreeLib from 'three-js';

const THREE = ThreeLib(['JSONLoader']);

/**
 * JSONモデルを読み込むヘルパー関数
 *
 * @param path ファイルパス
 * @return 読み込み結果
 */
export function loadModel(path: string): Promise<{geometry: THREE.Geometry, material: THREE.Material}> {
  let loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(path, (geometry, material) => resolve({geometry, material})));
}

/**
 * テクスチャを読み込むヘルパー関数
 *
 * @aram path ファイルパス
 * @return  読み込み結果
 *
 * @param path
 * @returns {Promise}
 */
export function loadTexture(path: string): Promise<THREE.Texture> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(path, texture => resolve(texture)));
}