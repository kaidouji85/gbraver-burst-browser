// @flow

import {ThreeDimensionLayerStubBase} from "../../util/three-dimension-layer-stub";
import type {Resources} from "../../../src/resource/index";
import * as THREE from "three";
import {NeoLandozer} from "../../../src/game-object/armdozer/neo-landozer/neo-landozer";
import {PlayerNeoLandozer} from "../../../src/game-object/armdozer/neo-landozer";

new ThreeDimensionLayerStubBase({
  resourceBashPath: '../../resources/',
  init(resources: Resources): NeoLandozer {
    const neoLandozer = PlayerNeoLandozer(resources);
    neoLandozer.stand().start();
    return neoLandozer;
  },
  addScene(scene: THREE.Scene, gameObject: NeoLandozer): void {
    gameObject.getThreeJsObjects().forEach(v => scene.add(v));
  },
  gameLoop(time: DOMHighResTimeStamp, camera: THREE.Camera, gameObject: NeoLandozer): void {
    gameObject.gameLoop(time, camera);
  }
});