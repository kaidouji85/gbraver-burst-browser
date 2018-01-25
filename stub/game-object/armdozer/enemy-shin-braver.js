// @flow

import {ThreeDimensionLayerStubBase} from "../../util/three-dimension-layer-stub";
import {ShinBraver} from "../../../src/game-object/armdozer/shin-breaver/shin-breaver";
import type {Resources} from "../../../src/resource/index";
import * as THREE from "three";
import {EnemyShinBraver} from "../../../src/game-object/armdozer/shin-breaver";

new ThreeDimensionLayerStubBase({
  resourceBashPath: '../../resources/',
  init(resources: Resources): ShinBraver {
    const shinBraver = new EnemyShinBraver(resources);
    shinBraver.stand().start();
    return shinBraver;
  },
  addScene(scene: THREE.Scene, gameObject: ShinBraver): void {
    gameObject.getThreeJsObjects().forEach(v => scene.add(v));
  },
  gameLoop(time: DOMHighResTimeStamp, camera: THREE.Camera, gameObject: ShinBraver): void {
    gameObject.gameLoop(time, camera);
  }
});