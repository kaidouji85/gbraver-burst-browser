// @flow

import {loadServiceWorker} from "../service-worker/load-service-worker";
import {createRender} from "../render/renderer";
import {loadAllResource} from "../resource";
import {createBattleScene} from "./create-battle-scene";
import {createGameLoopListener} from "../action/game-loop/create-listener";
import {createDOMEventListener} from "../action/dom-event/create-listener";
import Tween from '@tweenjs/tween.js';
import {viewPerformanceStatics} from "../stats/view-performance-statics";

export async function main() {
  loadServiceWorker();
  viewPerformanceStatics(document.body);

  const resources = await loadAllResource('');

  const renderer = createRender();
  if (renderer.domElement && document.body) {
    document.body.appendChild(renderer.domElement);
  }

  const gameLoopListener = createGameLoopListener();
  const domEventListener = createDOMEventListener(renderer.domElement);

  const scene = createBattleScene({
    resources,
    gameLoopListener,
    domEventListener,
    renderer
  });

  gameLoopListener.subscribe(time => {
    Tween.update();
  });
}
