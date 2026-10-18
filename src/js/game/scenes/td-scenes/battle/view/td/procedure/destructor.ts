import * as THREE from "three";

import { TDLayerProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props レイヤープロパティ
 */
export function destructor(props: TDLayerProps) {
  const { scene, camera, players, armdozers, gameObjects } = props;
  const removeTargets: THREE.Object3D[] = [
    ...players.flatMap((v) => v.getObject3Ds()),
    ...armdozers.flatMap((v) => v.getObject3Ds()),
    ...gameObjects.getObject3Ds(),
  ];
  removeTargets.forEach((v) => {
    scene.remove(v);
  });
  if (scene.background instanceof THREE.Texture) {
    scene.background.dispose();
  }
  scene.background = null;
  players.forEach((player) => {
    player.destructor();
  });
  armdozers.forEach((armdozer) => {
    armdozer.destructor();
  });
  gameObjects.destructor();
  camera.destructor();
}
