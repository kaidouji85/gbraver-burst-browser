import * as THREE from "three";

import { HUDPlayerProps } from "../props";

/**
 * シーンに追加するオブジェクトを取得する
 * @param props プロパティ
 * @returns シーンに追加するオブジェクト
 */
export function getObject3Ds(props: HUDPlayerProps): THREE.Object3D[] {
  return [
    props.gauge.getObject3D(),
    props.turnStart.getObject3D(),
    props.resultIndicator.getObject3D(),
    props.predicatedDamage.getObject3D(),
    props.statusIcon.getObject3D(),
  ];
}
