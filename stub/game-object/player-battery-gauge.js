// @flow

import * as THREE from 'three';
import {HudLayerStubBase} from "../util/hud-layer-stub-base";
import type {Resources} from "../../src/resource/resource-manager";
import {BatteryGauge} from "../../src/game-object/gauge/battery-gauge/battery-gauge";
import {PlayerBatteryGauge} from "../../src/game-object/gauge/battery-gauge";

new HudLayerStubBase({
  resourceBashPath: '../resources/',
  init: function (resources: Resources): BatteryGauge {
    const playerBatteryGauge = createPlayerBatteryGauge(resources);
    document.body.onclick = () => {
      console.log('on click!!');
      playerBatteryGauge.removeTween();
    };
    return playerBatteryGauge;
  },
  addScene(scene: THREE.Scene, gameObject: BatteryGauge): void {
    gameObject.getThreeJsObjectList().forEach(v => scene.add(v));
  },
  gameLoop(time: DOMHighResTimeStamp, gameObject: BatteryGauge): void {
    gameObject.gameLoop(time);
  }
});


function createPlayerBatteryGauge(resources: Resources): BatteryGauge {
  const playerBatteryGauge = PlayerBatteryGauge(resources, 5, 5);

  const tween1 = playerBatteryGauge.change(2);
  const tween2 = playerBatteryGauge.change(4);
  const tween3 = playerBatteryGauge.change(0);

  tween1.delay(1000);
  tween1.chain(tween2);
  tween2.delay(1000);
  tween2.chain(tween3);
  tween3.delay(1000);
  tween1.start();

  return playerBatteryGauge;
}