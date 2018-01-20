// @flow

import * as THREE from 'three';
import {HudLayerStubBase} from "../util/hud-layer-stub-base";
import type {Resources} from "../../src/resource/resource-manager";
import {EnemyHpGauge} from "../../src/game-object/gauge/hp-gauge";
import {HpGauge} from "../../src/game-object/gauge/hp-gauge/hp-gauge";

new HudLayerStubBase({
  resourceBashPath: '../resources/',
  init: function (resources: Resources): HpGauge {
    const playerHpGauge = EnemyHpGauge(resources, 3000, 3000);

    const tween1 = playerHpGauge.change(2000);
    const tween2 = playerHpGauge.change(2500);
    const tween3 = playerHpGauge.change(0);

    tween1.delay(1000);
    tween1.chain(tween2);
    tween2.delay(1000);
    tween2.chain(tween3);
    tween3.delay(1000);
    tween1.start();

    return playerHpGauge;
  },
  addScene(scene: THREE.Scene, gameObject: HpGauge): void {
    gameObject.getThreeJsObjectList().forEach(v => scene.add(v));
  },
  gameLoop(gameObject: HpGauge): void {
    gameObject.gameLoop();
  }
});