// @flow
import * as THREE from 'three';
import {BattleView} from "./view/index";
import OrbitControls from 'three-orbitcontrols';

/** デバッグモードに設定する */
export function debugMode(view: BattleView) {
  view.threeDimensionLayer.scene.add(new THREE.AxisHelper(1000));

  const controls = new OrbitControls(view.threeDimensionLayer.camera, view.renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
}