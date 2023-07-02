import * as THREE from "three";
import {SPRITE_RENDER_ORDER} from "../../../render/render-order/td-render-order";
import {BaseLineLength} from "./base-line-length";

/**
 * 線メッシュを生成する
 * @param color 線の色
 * @param width 線の幅
 * @return 生成結果
 */
export function createLine(color: THREE.ColorRepresentation, width: number): THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(BaseLineLength, 0, 0),
    new THREE.Vector3(0, width / 2, 0),
    new THREE.Vector3(0, -width / 2, 0),
  ]);
  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const line = new THREE.Mesh(geometry, material);
  line.renderOrder = SPRITE_RENDER_ORDER;
  return line;
}