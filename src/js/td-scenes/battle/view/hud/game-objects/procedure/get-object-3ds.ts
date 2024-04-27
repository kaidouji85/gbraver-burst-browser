import * as THREE from "three";

import { HUDGameObjectsProps } from "../props";

/**
 * シーンに追加するオブジェクトを取得する
 * @param props プロパティ
 * @returns シーンに追加するオブジェクト
 */
export function getObject3Ds(props: HUDGameObjectsProps): THREE.Object3D[] {
  return [
    props.batterySelector.getObject3D(),
    props.batterySelectorLeadLine.getObject3D(),
    props.burstButton.getObject3D(),
    props.burstButtonLeadLine.getObject3D(),
    props.pilotButton.getObject3D(),
    props.pilotButtonLeadLine.getObject3D(),
    props.timeScaleButton.getObject3D(),
    props.rearmostFader.getObject3D(),
    props.frontmostFader.getObject3D(),
    props.drawIndicator.getObject3D(),
  ];
}
