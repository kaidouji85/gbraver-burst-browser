// @flow

import {loadServiceWorker} from "../service-worker/load-service-worker";
import {createRender} from "../render/renderer";
import {DOMEventObserver} from "../observer/dom-event/dom-event-observer";
import {bindDom} from "../render/bind-dom";
import Tween from "@tweenjs/tween.js/src/Tween";
import {loadAllResource} from "../resource";
import {createBattleScene} from "./create-battle-scene";

export async function main() {
  loadServiceWorker();

  const resources = await loadAllResource('');
  const renderer = createRender();
  bindDom(renderer);
  const domEventObserver = new DOMEventObserver(renderer.domElement);
  const scene = createBattleScene(resources, domEventObserver, renderer);

  const gameLoop = (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    scene.gameLoop(time);
  };
  requestAnimationFrame(gameLoop);
}
