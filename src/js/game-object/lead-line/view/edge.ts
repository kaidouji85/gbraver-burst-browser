import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../../../render/render-order/td-render-order";
import { BaseLineLength } from "./base-line-length";

/** 縁取りメッシュ */
export type EdgeMesh = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

/**
 * 引き出し線の縁取りを生成する
 * @param lineWidth 引き出し線の太さ
 * @returns 生成結果
 */
export function createEdge(lineWidth: number): EdgeMesh {
  const edgeWidth = Math.sqrt((lineWidth / 2) ** 2 + BaseLineLength ** 2);
  const geometry = new THREE.PlaneGeometry(edgeWidth, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const edge = new THREE.Mesh(geometry, material);
  edge.renderOrder = SPRITE_RENDER_ORDER;
  return edge;
}
