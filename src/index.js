// @flow
import Tween from '@tweenjs/tween.js';
import {ResourceManager} from './resource/resource-manager';
import {BattleScene} from './scene/battle/index.js';
import {ArmDozerIdList, ArmDozers, start} from "gbraver-burst-core";
import type {Observer} from "./scene/observer";

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager();
  await resourceManager.load();

  // TODO 開発用にダミーデータを作成している
  const scene: Observer = new BattleScene({
    resources: resourceManager.resources,
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

  const gameLoop = (time: ?number) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    scene.notify({type: 'gameLoop'});
  };
  gameLoop();
})();