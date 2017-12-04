// @flow
import Tween from 'tween.js';
import {ResourceManager} from './resource/resource-manager';
import {BattleApplication} from './app/battle/index.js';
import type {Application} from './app/application';
import {ArmDozerIdList, ArmDozers, start} from "gbraver-burst-core";
import type {BattleAppState} from "./app/battle/state";
import type {BattleState} from "gbraver-burst-core/lib/flow-type";

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager();
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures(),
    resourceManager.loadCanvasImages(),
  ]);

  // TODO 開発用にダミーデータを作成している
  const app: Application = new BattleApplication({
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

  const gameLoop = (time: ?number) => {
    requestAnimationFrame(gameLoop);
    Tween.update(time);
    app.observer.notify({type: 'gameLoop'});
  };
  gameLoop();
})();