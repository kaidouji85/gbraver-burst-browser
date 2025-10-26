import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";

/**
 * バッテリーセレクタ数字のCanvasMeshを生成するヘルパー関数
 * @param value 数字の値
 * @param texture テクスチャ
 * @returns バッテリーセレクタ数字
 */
export function createBatteryNumberMesh(
  value: number,
  texture: THREE.Texture,
): HorizontalAnimationMesh {
  const maxAnimation = 16;
  const numberMesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation,
    width: 64,
    height: 64,
  });
  numberMesh.animate(value / maxAnimation);
  return numberMesh;
}
