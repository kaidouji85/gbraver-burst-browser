// @flow

import * as THREE from 'three';
import {animatedTexture} from "../texture/animation/texture-animation";

/** アニメーションテクスチャID */
export type AnimatedTextureID = string;

/** アニメーションテクスチャの設定 */
export type AnimatedTextureConfig = {
  id: AnimatedTextureID,
  path: string,
  horizon: number,
  vertical: number
};

/** アニメーションテクスチャのリソース */
export type AnimatedTextureResource = {
  id: AnimatedTextureID,
  texture: THREE.Texture,
  horizon: number,
  vertical: number
};

/** アニメーションテクスチャIDをまとめたもの */
export const ANIMATED_TEXTURE_IDS = {
  SHIN_BRAVER_MY_TURN: 'SHIN_BRAVER_MY_TURN',
  SHIN_BRAVER_PUNCH: 'SHIN_BRAVER_PUNCH',
};

/** アニメーションテクスチャを集めたもの */
export const ANIMATED_TEXTURE_CONFIGS: AnimatedTextureConfig[] = [
  {
    id: ANIMATED_TEXTURE_IDS.SHIN_BRAVER_MY_TURN,
    path: 'armdozer/shin-braver/my-turn.png',
    horizon: 16,
    vertical: 1
  },
  {
    id: ANIMATED_TEXTURE_IDS.SHIN_BRAVER_PUNCH,
    path: 'armdozer/shin-braver/punch.png',
    horizon: 16,
    vertical: 1
  }
];

/**
 * アニメーションテクスチャを読み込む
 *
 * @param basePath ベースとなるパス
 * @param config アニメーションテクスチャの設定
 * @return アニメーションテクスチャ
 */
export function loadAnimatedTexture(basePath: string, config: AnimatedTextureConfig): Promise<AnimatedTextureResource> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(`${basePath}${config.path}`, texture =>{
    animatedTexture(texture, config.horizon, config.vertical);
    resolve({
      id: config.id,
      texture: texture,
      horizon: config.horizon,
      vertical: config.vertical
    });
  }));
}

/**
 * アニメーションテクスチャを全て読み込む
 *
 * @param basePath ベースとなるパス
 * @return 全アニメーション地テクスチャ
 */
export async function loadAllAnimatedTexture(basePath: string): Promise<AnimatedTextureResource[]> {
  return await Promise.all(ANIMATED_TEXTURE_CONFIGS.map(v => loadAnimatedTexture('', v)));
}