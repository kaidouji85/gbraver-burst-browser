// @flow
import {HudGameObject, HudLayerSutb} from "../util/hud-layer-stub";
import type {Resources} from "../../src/resource/resource-manager";
import {PlayerHpGauge} from "../../src/game-object/gauge/hp-gauge";

new HudLayerSutb({
  resourceBashPath: '../resources/',
  init: function (resources: Resources): HudGameObject {
    const playerHpGauge = PlayerHpGauge(resources, 3000, 3000);

    const tween1 = playerHpGauge.change(2000);
    const tween2 = playerHpGauge.change(2500);
    const tween3 = playerHpGauge.change(0);

    tween1.chain(tween2);
    tween2.delay(1000);
    tween2.chain(tween3);
    tween3.delay(1000);
    tween1.start();

    return playerHpGauge;
  }
});