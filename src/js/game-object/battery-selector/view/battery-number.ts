import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { MAX_VALUE } from "./battery-merter";

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
  const angle = Math.PI - (Math.PI / MAX_VALUE) * value;
  const radius = 155;
  numberMesh.getObject3D().position.x = radius * Math.cos(angle);
  numberMesh.getObject3D().position.y = radius * Math.sin(angle);
  return numberMesh;
}
