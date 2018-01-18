// @flow
import * as THREE from 'three';
import {ResourceManager} from "../../src/resource/resource-manager";
import {hudLayerCamera} from "../util/hud-layer-camera";
import {PlayerHpGauge} from "../../src/game-object/gauge/hp-gauge";

(async function() {
  const resourceManager = new ResourceManager('../resources/');
  await resourceManager.load();

  const scene = new THREE.Scene();
  const camera = hudLayerCamera();
  const rendered = new THREE.WebGLRenderer();
  rendered.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(rendered.domElement);

  const playerHpGauge = PlayerHpGauge(resourceManager.resources, 3000, 3000);
  playerHpGauge.getThreeJsObjectList().forEach(v => scene.add(v));
  
  function gameLoop() {
    requestAnimationFrame(gameLoop);
    playerHpGauge.gameLoop();
    rendered.render(scene, camera);
  }
  requestAnimationFrame(gameLoop);
}());
