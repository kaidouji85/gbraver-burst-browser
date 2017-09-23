// @flow
import * as THREE from 'three';

//TODO 使い方を詳細に書く
/**
 * テクスチャアニメーションで使うテクスチャを生成する
 * アニメフレームを変更する際には、offset.xおよびoffset.yを調整する
 *
 * @param origin テクスチャのオリジナルデータ
 * @param horizonNum 横の分割数
 * @param verticalNum 縦の分割数
 * @returns 生成したテクスチャ
 */
export function createAnimatedTexture(origin: THREE.Texture, horizonNum: number, verticalNum: number): THREE.Texture {
  const texture = origin.clone();
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1/horizonNum, 1/verticalNum);
  texture.offset.x = 0;
  texture.offset.y = 0;
  return texture;
}