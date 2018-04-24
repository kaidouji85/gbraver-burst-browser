// @flow
import Tween from '@tweenjs/tween.js';
import {loadAllResource} from './resource/index';
import {BattleScene} from './scene/battle/index.js';
import type {Observer} from "./scene/observer";
import {start} from "gbraver-burst-core";
import {ArmDozers, ArmDozerIdList} from 'gbraver-burst-core/lib/master/armdozers';

(async function(){
  loadServiceWorker();

  const resources = await loadAllResource('');

  // TODO 開発用にダミーデータを作成している
  const scene: Observer = new BattleScene({
    resources: resources,
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
  //scene.notify({type: 'debugMode'});

  const gameLoop = (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    scene.notify({type: 'gameLoop', time});
  };
  requestAnimationFrame(gameLoop);
})();

async function loadServiceWorker() {
  if (!navigator.serviceWorker) {
    return;
  }

  try {
    await navigator.serviceWorker.register('./sw.js');
    console.log('service worker register success!');
  } catch (e) {
    console.log('service worker register failed');
    console.log(e);
  }
}