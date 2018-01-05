import * as THREE from "three";

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