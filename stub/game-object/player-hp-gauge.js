// @flow
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import {ResourceManager} from "../../src/resource/resource-manager";
import {hudLayerCamera} from "../util/hud-layer-camera";
import {PlayerHpGauge} from "../../src/game-object/gauge/hp-gauge";
import type {Resources} from "../../src/resource/resource-manager";
import {HpGauge} from "../../src/game-object/gauge/hp-gauge/hp-gauge";

(async function() {
  const resourceManager = new ResourceManager('../resources/');
  await resourceManager.load();

  const scene = new THREE.Scene();
  const camera = hudLayerCamera();
  const rendered = new THREE.WebGLRenderer();
  rendered.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(rendered.domElement);

  const playerHpGauge = createPlayerHpGauge(resourceManager.resources);
  playerHpGauge.getThreeJsObjectList().forEach(v => scene.add(v));

  function gameLoop(time) {
    requestAnimationFrame(gameLoop);
    TWEEN.update(time);
    playerHpGauge.gameLoop();
    rendered.render(scene, camera);
  }
  requestAnimationFrame(gameLoop);
}());

function createPlayerHpGauge(resources: Resources): HpGauge {
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