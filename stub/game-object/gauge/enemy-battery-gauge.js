// @flow

import * as THREE from 'three';
import {HudLayerStubBase} from "../../util/hud-layer-stub-base";
import type {Resources} from "../../../src/resource/index";
import {BatteryGauge} from "../../../src/game-object/gauge/battery-gauge/battery-gauge";
import {EnemyBatteryGauge, PlayerBatteryGauge} from "../../../src/game-object/gauge/battery-gauge/index";

new HudLayerStubBase({
  resourceBashPath: '../../resources/',
  init: function (resources: Resources): BatteryGauge {
    const enemyBatteryGauge = createEnemyBatteryGauge(resources);
    document.body.onclick = () => {
      console.log('on click!!');
      enemyBatteryGauge.removeTween();
    };
    return enemyBatteryGauge;
  },
  addScene(scene: THREE.Scene, gameObject: BatteryGauge): void {
    gameObject.getThreeJsObjectList().forEach(v => scene.add(v));
  },
  gameLoop(time: DOMHighResTimeStamp, gameObject: BatteryGauge): void {
    gameObject.gameLoop(time);
  }
});


function createEnemyBatteryGauge(resources: Resources): BatteryGauge {
  const enemyBatteryGauge = EnemyBatteryGauge(resources, 5, 5);

  const tween1 = enemyBatteryGauge.change(1);
  const tween2 = enemyBatteryGauge.change(4);
  const tween3 = enemyBatteryGauge.change(2);

  tween1.delay(1000);
  tween1.chain(tween2);
  tween2.delay(1000);
  tween2.chain(tween3);
  tween3.delay(1000);
  tween1.start();

  return enemyBatteryGauge;
}