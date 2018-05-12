// @flow
import * as THREE from 'three';
import type {BattleSceneState} from "./state";
import {BattleSceneView} from "./view/index";

/** デバッグモードに設定する */
export function debugMode(view: BattleSceneView, state: BattleSceneState): void {
  view.threeDimensionLayer.scene.add(new THREE.AxisHelper(1000));
}