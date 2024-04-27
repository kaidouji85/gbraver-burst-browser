import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";

/**
 * バッテリーセレクタ数字のCanvasMeshを生成するヘルパー関数
 * @param value 数字の値
 * @param texture テクスチャ
 * @returns バッテリーセレクタ数字
 */
export function batteryNumber(
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

/** 座標 */
type Position = {
  x: number;
  y: number;
};

/**
 * バッテリーセレクタ数字の座標を計算する
 * @param battery バッテリー数字
 * @param maxBattery 最大バッテリー
 * @returns 計算結果
 */
export function batteryNumberPosition(
  battery: number,
  maxBattery: number,
): Position {
  const angle = Math.PI - (Math.PI / maxBattery) * battery;
  const radius = maxBattery !== 8 ? 155 : 175;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

/**
 * バッテリーセレクタ数字のスケールを計算する
 * @param battery
 * @param maxBattery
 * @returns 計算結果
 */
export function batteryNumberScale(
  battery: number,
  maxBattery: number,
): number {
  return maxBattery <= 5 ? 1 : 0.8;
}
