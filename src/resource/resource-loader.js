// @flow
import * as THREE from 'three';

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
 */
export function loadTexture(path: string): Promise<THREE.Texture> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(path, texture => resolve(texture)));
}

/**
 * CANVAS用画像ファイルを読み込む
 *
 * @param path ファイルパス
 * @return 読み込み結果
 */
export function loadCanvasImage(path: string): Promise<Image> {
  const img = new Image();
  img.src = path;
  return new Promise(resolve => img.onload = () => resolve(img))
}