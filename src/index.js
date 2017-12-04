// @flow
import Tween from 'tween.js';
import {ResourceManager} from './resource/resource-manager';
import {BattleApplication} from './app/battle/index.js';
import {ArmDozerIdList, ArmDozers, start} from "gbraver-burst-core";
import type {Observer} from "./app/observer";

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager();
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures(),
    resourceManager.loadCanvasImages(),
  ]);

  // TODO 開発用にダミーデータを作成している
  const app: Observer = new BattleApplication({
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
  app.notify({type: 'debugMode'});

  const gameLoop = (time: ?number) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    app.notify({type: 'gameLoop'});
  };
  gameLoop();
})();