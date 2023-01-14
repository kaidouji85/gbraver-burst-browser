import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";

/**
 * バッテリーセレクタ数字のCanvasMeshを生成するヘルパー関数
 * @param value 数字の値
 * @param texture テクスチャ
 * @return バッテリーセレクタ数字
 */
export function batteryNumber(
  value: number,
  texture: THREE.Texture
): HorizontalAnimationMesh {
  const maxAnimation = 8;
  const numberMesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation,
    width: 64,
    height: 64,
  });
  numberMesh.animate(value / 8);
  return numberMesh;
}

/** 座標 */
type Position = {
  x: number;
  y: number;
};

/**
 * バッテリーセレクタ数字の座標を計算する
 * @param battery バッテリー数字
 * @param maxBattery 最大バッテリー
 * @return 計算結果
 */
export function batteryNumberPosition(
  battery: number,
  maxBattery: number
): Position {
  const angle = Math.PI - (Math.PI / maxBattery) * battery;
  const radius = 155;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}
