import * as THREE from "three";

import { TDPlayerProps } from "../props";

/**
 * シーンに追加するオブジェクトを取得する
 * @param props レイヤープロパティ
 * @returns シーンに追加するオブジェクト
 */
export function getObject3Ds(props: TDPlayerProps): THREE.Object3D[] {
  return [
    props.hitMark.shockWave.getObject3D(),
    props.hitMark.lightning.getObject3D(),
    props.armdozerEffects.powerUp.getObject3D(),
    props.armdozerEffects.reflect.getObject3D(),
    props.armdozerEffects.continuousAttack.getObject3D(),
    props.armdozerEffects.damageHalved.getObject3D(),
    props.armdozerEffects.batteryEnhancement.getObject3D(),
    props.batteryNumber.getObject3D(),
    props.batteryCorrect.getObject3D(),
    props.recoverBattery.getObject3D(),
    props.damageIndicator.getObject3D(),
  ];
}
