// @flow
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {BattleAppCore} from '../core';

/** デバッグモードに設定する */
export function debugMode(core: BattleAppCore) {
  core.view.threeDimensionLayer.scene.add(new THREE.AxisHelper(1000));

  const controls = new OrbitControls(core.view.threeDimensionLayer.camera, core.view.renderer.domElement);
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI * 0.48;
}