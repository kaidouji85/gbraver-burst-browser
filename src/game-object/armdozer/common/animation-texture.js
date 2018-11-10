// @flow

import * as THREE from 'three';

// TODO 削除する
/** アームドーザのテクスチャアニメーション */
export interface ArmdozerAnimationTexture {
  /**
   * アニメーション進捗に応じたテクスチャを返す
   *
   * @param animation 0〜1で指定するアニメーション進捗度
   * @return テクスチャ
   */
  animate(animation: number): THREE.Texture;
}