// @flow
import Tween from '@tweenjs/tween.js';
import {loadAllResource} from './resource/index';
import {BattleScene} from './scene/battle/index.js';
import {start} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers} from 'gbraver-burst-core/lib/master/armdozers';
import {createRender} from "./render/renderer";
import {bindDom} from "./render/bind-dom";
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {DOMEventObserver} from "./observer/dom-event/dom-event-observer";

(async function(){
  loadServiceWorker();

  const resources = await loadAllResource('');
  const renderer = createRender();
  bindDom(renderer);
  const domEventObserver = new DOMEventObserver();

  // TODO 開発用にダミーデータを作成している
  const scene: BattleScene = new BattleScene({
    resources: resources,
    renderer: renderer,
    domEventListener: domEventObserver,
    playerId: 'test01',
    battleState: start(
      {
        playerId: 'test01',
        armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
      }, {
        playerId: 'test02',
        armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
      }
    )
  });

  const gameLoop = (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    scene.gameLoop(time);
  };
  requestAnimationFrame(gameLoop);
})();

