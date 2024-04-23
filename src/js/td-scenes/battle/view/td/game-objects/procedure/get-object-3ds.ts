import * as THREE from "three";

import { TDGameObjectsProps } from "../props";

/**
 * シーンに追加するオブジェクトを取得する
 * @param props プロパティ
 * @return シーンに追加するオブジェクト
 */
export function getObject3Ds(props: TDGameObjectsProps): THREE.Object3D[] {
  return [
    ...props.stage.getThreeJsObjects(),
    props.turnIndicator.getObject3D(),
    props.skyBrightness.getObject3D(),
    ...props.illumination.getObject3Ds(),
  ];
}
