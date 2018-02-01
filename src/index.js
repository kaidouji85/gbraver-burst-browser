// @flow
import Tween from '@tweenjs/tween.js';
import {loadAllResource} from './resource/index';
import {BattleScene} from './scene/battle/index.js';
import {ArmDozerIdList, ArmDozers, start} from "gbraver-burst-core";
import type {Observer} from "./scene/observer";

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
        armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
      }, {
        playerId: 'test02',
        armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
      }
    )
  });
  scene.notify({type: 'debugMode'});

  const gameLoop = (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    scene.notify({type: 'gameLoop', time});
  };
  requestAnimationFrame(gameLoop);
})();

function loadServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
  }
  /*
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
  */
}