import * as THREE from "three";

import { HUDLayerProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props レイヤープロパティ
 */
export function destructor(props: HUDLayerProps) {
  const removeTargets: THREE.Object3D[] = [
    ...props.gameObjects.getObject3Ds(),
    ...props.armdozers.flatMap((v) => v.getObject3Ds()),
    ...props.players.flatMap((v) => v.getObject3Ds()),
    ...props.pilots.flatMap((v) => v.getObject3Ds()),
  ];
  removeTargets.forEach((v) => {
    props.scene.remove(v);
  });
  props.gameObjects.destructor();
  props.armdozers.forEach((armdozer) => {
    armdozer.destructor();
  });
  props.players.forEach((player) => {
    player.destructor();
  });
  props.pilots.forEach((pilot) => {
    pilot.destructor();
  });
  props.camera.destructor();
}
