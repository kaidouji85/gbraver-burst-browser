// @flow
import * as THREE from 'three';

/**
 * テクスチャアニメーション用にテクスチャを設定する
 * アニメフレームを変更する際には、offset.xおよびoffset.yを調整する
 *
 * 例) 横8コマのアニメーション
 * const texture = animatedTexture(origin, 8, 1);
 * texture.offset.x = 0 / 8;  // 1コマ目を表示
 * texture.offset.x = 2 / 8;  // 3コマ目を表示
 * texture.offset.x = 7 / 8;  // 8コマ目を表示
 *
 * @param origin テクスチャのオリジナルデータ
 * @param horizonDividedNum 横の分割数
 * @param verticalDividedNum 縦の分割数
 */
export function animatedTexture(texture: typeof THREE.Texture, horizonDividedNum: number, verticalDividedNum: number): void {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1 / horizonDividedNum, 1 / verticalDividedNum);
  texture.offset.x = 0;
  texture.offset.y = 0;
}