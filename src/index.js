// @flow
import Tween from 'tween.js';
import {ResourceManager} from './resource/resource-manager';
import {BattleApplication} from './app/battle/index.js';

(async function(){
  const resourceManager:  ResourceManager = new ResourceManager();
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures(),
    resourceManager.loadCanvasImages(),
  ]);

  const app = new BattleApplication({resources: resourceManager.resources});

  const animate = (time: ?number) => {
    requestAnimationFrame( animate );
    app.gameLoop();
    Tween.update(time);
  };
  animate();
})();