// @flow

import * as THREE from 'three';
import {HudLayerStubBase} from "../../util/hud-layer-stub-base";
import type {Resources} from "../../../src/resource/index";
import {BurstGauge} from "../../../src/game-object/gauge/burst-gauge/burst-gauge";
import {PlayerBurstGauge} from "../../../src/game-object/gauge/burst-gauge";

new HudLayerStubBase({
  resourceBashPath: '../../resources/',
  init: function (resources: Resources): BurstGauge {
    return PlayerBurstGauge(resources, true);
  },
  addScene(scene: THREE.Scene, gameObject: BurstGauge): void {
    gameObject.getThreeJsObjectList().forEach(v => scene.add(v));
  },
  gameLoop(time: DOMHighResTimeStamp, gameObject: BurstGauge): void {
    gameObject.gameLoop();
  }
});
