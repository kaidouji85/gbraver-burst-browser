// @flow
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import type {BattleSceneState} from "./state";
import {BattleSceneView} from "./view/index";

/** デバッグモードに設定する */
export function debugMode(view: BattleSceneView, state: BattleSceneState): void {
  view.threeDimensionLayer.scene.add(new THREE.AxisHelper(1000));

  const controls = new OrbitControls(view.threeDimensionLayer.camera, view.renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
}