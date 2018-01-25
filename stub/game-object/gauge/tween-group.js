// @flow

/**
 * TWEEN.Groupのテスト
 *
 * 同じ種類のゲームオブジェクトでも、TWEEN.Groupが違えば別々な動作をすることを確認する。
 * ここでは、プレイヤー、敵の2種類のHPゲージを用意する。
 * 画面をクリックすると敵HPゲージだけがアニメーションを停止する。
 */

import * as R from 'ramda';
import * as THREE from 'three';
import {HudLayerStubBase} from "../../util/hud-layer-stub-base";
import type {Resources} from "../../../src/resource/index";
import {EnemyHpGauge, PlayerHpGauge} from "../../../src/game-object/gauge/hp-gauge/index";
import {HpGauge} from "../../../src/game-object/gauge/hp-gauge/hp-gauge";

new HudLayerStubBase({
  resourceBashPath: '../../resources/',
  init: function (resources: Resources): HpGauge[] {
    const playerGauge = createPlayerHpGauge(resources);
    const enemyGauge = createEnemyHpGauge(resources);

    const body = document.body || document.createElement('body');
    body.onclick = function() {
      console.log('click');
      enemyGauge.removeTween();
    };

    return [playerGauge, enemyGauge];
  },
  addScene(scene: THREE.Scene, gameObject: HpGauge[]): void {
    R.flatten(gameObject.map(v => v.getThreeJsObjectList()))
      .forEach(v => scene.add(v));

  },
  gameLoop(time: DOMHighResTimeStamp, gameObject: HpGauge[]): void {
    gameObject.forEach(v => v.gameLoop(time));
  }
});

function createPlayerHpGauge(resources: Resources) {
  const playerHpGauge = PlayerHpGauge(resources, 3000, 3000);

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
}

function createEnemyHpGauge(resources: Resources) {
  const enemyHpGauge = EnemyHpGauge(resources, 4500, 4500);

  const tween1 = enemyHpGauge.change(1000);
  const tween2 = enemyHpGauge.change(3200);
  const tween3 = enemyHpGauge.change(500);

  tween1.delay(1000);
  tween1.chain(tween2);
  tween2.delay(1000);
  tween2.chain(tween3);
  tween3.delay(1000);
  tween1.start();

  return enemyHpGauge;
}